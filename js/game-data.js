// ===== GAME CONTENT DATA =====
// Tọa độ dùng hệ 1000 × 625. Có thể chỉnh trực tiếp trong mảng points của từng level.

const LEVELS = [
  {
    id: 1,
    title: 'Bánh Trung thu',
    short: 'BÁNH TRUNG THU',
    difficulty: 'Dễ',
    max: 20,
    art: 'assets/mooncake-guide.png',
    desc: 'Nối 20 điểm để hoàn thiện mặt bánh Trung thu. Mẹo: đi theo viền tròn trước.',
    points: [
      [500,88],[588.9,130.3],[677.5,173.5],[699.9,269.4],[721.3,365.5],[660.3,442.8],[598.5,519.5],[500,520],
      [401.5,519.5],[339.7,442.8],[278.7,365.5],[300.1,269.4],[322.5,173.5],[411.1,130.3],
      [500,315],[500,263],[549.5,298.9],[530.6,357.1],[469.4,357.1],[450.5,298.9]
    ]
  },
  {
    id: 2,
    title: 'Lồng đèn con cá',
    short: 'LỒNG ĐÈN CÁ',
    difficulty: 'Trung bình',
    max: 30,
    art: 'assets/fish-lantern-guide.png',
    desc: 'Hình cá cần nhiều lần đổi hướng hơn. Chạm đúng tâm số đang sáng rồi kéo tiếp.',
    points: [
      [205,310],[235,240],[300,195],[390,175],[485,190],[560,225],[610,270],[645,310],[610,350],[560,395],[485,430],[390,445],[300,425],[235,380],[205,310],
      [120,245],[165,305],[120,365],[205,310],[320,250],[360,225],[400,250],[360,275],[320,250],
      [520,295],[555,315],[520,335],[490,315],[520,295],[205,300]
    ]
  },
  {
    id: 3,
    title: 'Lồng đèn ngôi sao',
    short: 'NGÔI SAO',
    difficulty: 'Khó',
    max: 40,
    art: '',
    desc: '40 điểm tạo thành chiếc đèn sao nhiều góc. Giữ nhịp kéo đều tay và đừng bỏ qua điểm nhỏ.',
    points: [
      [500,85],[530.9,209.9],[629.3,127],[580.9,246.2],[709.2,237],[597.7,310],[629.3,427.1],[530.9,400.1],[500,525],[469.1,400.1],[370.7,427.1],[402.3,310],[290.8,237],[419.1,246.2],[370.7,127],[469.1,209.9],
      [500,205],[514.2,258.6],[567.6,243.2],[541,289.7],[600,305],[541,320.3],[567.6,366.8],[514.2,351.4],[500,405],[485.8,351.4],[432.4,366.8],[459,320.3],[400,305],[459,289.7],[432.4,243.2],[485.8,258.6],
      [500,220],[548,275],[530,335],[500,390],[470,335],[452,275],[500,220],[500,85]
    ]
  },
  {
    id: 4,
    title: 'Đêm rước đèn',
    short: 'ĐÊM RƯỚC ĐÈN',
    difficulty: 'Khó nhất',
    max: 50,
    art: 'assets/kids-guide.png',
    desc: '50 điểm kết hợp trăng, đèn và nét dáng đoàn rước. Đây là màn thử thách cuối cùng.',
    points: [
      [700,45],[763.3,54],[818.9,80.1],[865.7,122.2],[885,195],[865.7,267.8],[818.9,309.9],[763.3,336],[700,345],[636.7,336],[581.1,309.9],[534.3,267.8],[515,195],[534.3,122.2],[581.1,80.1],[636.7,54],
      [500,300],[539.5,282.9],[593.8,299.9],[606.7,358.2],[536.8,430.5],[463.2,430.5],[393.3,358.2],[406.2,299.9],[460.5,282.9],[500,300],
      [500,330],[532,348],[548,375],[500,392],[452,375],[468,348],
      [240,440],[220,405],[225,360],[245,330],[250,270],[270,225],[292,270],[300,320],[325,295],[350,310],[365,340],[355,365],[335,382],[350,425],[330,465],[295,475],[265,455],[252,430]
    ]
  }
];

// 16 hành vi văn hóa: câu chữ được ghép linh hoạt vào quẻ.
const CULTURE_BEHAVIORS = [
  'Luôn tò mò, tư duy phản biện',
  'Khuyến khích và ghi nhận duy trì cải tiến',
  'Có 1% mới có 100%',
  'Làm gương',
  'Kỷ luật',
  'Bao dung, chia sẻ, hướng đến mục đích chung',
  'Ghi nhận tích cực',
  'Giải quyết vấn đề một cách xây dựng',
  'Giao tiếp rõ ràng và mạch lạc',
  'Giữ thái độ tích cực',
  'Nói đúng lời - giữ đúng hẹn',
  'Cam kết chia sẻ thông tin minh bạch',
  'Vấn đề đi kèm giải pháp',
  'Bảo vệ mục tiêu chung',
  'Minh bạch trong công việc',
  'Nghĩ đúng - nói đúng - làm đúng'
];

const FORTUNE_DATA = {
  'Sự nghiệp': [
    'Một cơ hội tốt đang đến gần. Hãy giữ tinh thần {behavior}; đi chậm nhưng chắc sẽ giúp bạn tạo đà bền vững.',
    'Công việc có dấu hiệu sáng hơn khi bạn chủ động chọn việc quan trọng nhất. Hãy thực hành “{behavior}” để biến kế hoạch thành kết quả.',
    'Một cuộc trao đổi đúng lúc có thể mở ra bước tiến mới. Quẻ nhắc bạn giữ “{behavior}” để đồng đội cùng nhìn về một hướng.'
  ],
  'Gia đình': [
    'Gia đạo ấm áp khi mọi người dành thời gian thật sự cho nhau. Hãy nuôi dưỡng “{behavior}” từ những việc nhỏ mỗi ngày.',
    'Một cuộc trò chuyện chân thành sẽ giúp xóa bớt khoảng cách. Trung thu này, hãy nhớ “{behavior}” để giữ sự bình an trong nhà.',
    'Quẻ gia đình thiên về sum vầy. Một thái độ “{behavior}” sẽ giúp mọi người dễ lắng nghe và sẻ chia hơn.'
  ],
  'Tình cảm': [
    'Duyên lành đến từ sự chân thành. Khi bạn giữ “{behavior}”, mối quan hệ sẽ có thêm niềm tin và những cuộc trò chuyện đẹp.',
    'Một tín hiệu vui có thể xuất hiện theo cách rất tự nhiên. Hãy mang tinh thần “{behavior}” để đón nhận mà không vội vàng.',
    'Quẻ tình cảm khuyên bạn nói điều cần nói và làm điều cần làm. “{behavior}” sẽ là chiếc cầu nối cho sự thấu hiểu.'
  ],
  'Tiền bạc': [
    'Tài lộc thiên về tích lũy. Hãy áp dụng “{behavior}” khi chi tiêu và quyết định để những khoản nhỏ tạo nên nền tảng vững.',
    'Một cơ hội tài chính có thể xuất hiện nhưng cần tỉnh táo. Nhớ “{behavior}” để kiểm tra thông tin trước khi xuống quyết định.',
    'Dòng tiền tốt hơn khi mục tiêu rõ và thói quen đều. Trung thu này, hãy giữ “{behavior}” để tài lộc đi cùng sự an tâm.'
  ]
};
