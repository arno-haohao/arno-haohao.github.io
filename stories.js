/* 独立 AU 数据；原 data.js 作为原始备份保留。人物关系为虚构校园设定。 */
// 关系设定参考 https://www.asianfanfics.com/story/view/1779065/1/n-a；聊天与日记为本篇新写。
const STORY_ROUTES = [
  {
    id: 'bingfan',
    title: '哥哥，别把我当小孩',
    subtitle: 'Arno × 陈炳帆',
    description: '邻居哥哥 AU · 十九岁的大一新生，追着二十四岁的研二哥哥考进了同一所大学。'
  },
  {
    id: 'alpha',
    title: 'alpha开发部',
    subtitle: 'Arno · 原故事',
    description: '原始内容备份。'
  }
];

(() => {
  const requested = new URLSearchParams(location.search).get('story');
  const selected = STORY_ROUTES.find(s => s.id === requested) || STORY_ROUTES[0];
  DATA.story = selected;
  document.documentElement.dataset.story = selected.id;
  document.title = 'Arno 的手机';
  if (selected.id !== 'bingfan') return;

  const ARNO_AV = 'photos/arno-daily-4-v2.jpg';
  const FAN_AV = 'photos/bingfan-daily-1.jpg';
  const ANXIN_AV = 'photos/av6.jpg';
  const incoming = (text, time) => ({ src: 'wechat', name: '陈炳帆', me: false, text, time });
  const arno = (text, time) => ({ src: 'wechat', name: '陈炳帆', me: true, text, time });
  const other = (name, me, text, time) => ({ src: 'wechat', name, me, text, time });
  const picture = (me, img, time, alt) => ({ src: 'wechat', name: '陈炳帆', me, img, time, alt });
  const diary = (date, text) => ({ xpost: { date, text } });
  const openChat = name => ({ gate: 'open', src: 'wechat', name });
  const back = name => ({ gate: 'back', src: 'wechat', name });
  const fanComment = (text, time = '刚刚', replyTo) => ({ user: 'bingfan', img: FAN_AV, text, time, replyTo, likes: 2 });
  const arnoComment = (text, time = '刚刚', replyTo) => ({ user: 'arno', img: ARNO_AV, text, time, replyTo, likes: 2 });

  Object.assign(DATA, {
    owner: 'Arno',
    ownerAv: ARNO_AV,
    wallpaper: { lock: 'photos/arno-daily-5-v2.jpg', home: 'photos/arno-daily-5-v2.jpg' },
    reminders: ['周一 · 研究室例会', '周四 · 图书馆还书'],
    wechat: [
      {
        name: '陈炳帆', img: FAN_AV, color: '#5b8def', time: '', preview: '暂无消息', unread: 0, reply: '', msgs: []
      },
      {
        name: '周安信', img: ANXIN_AV, color: '#4a90e2', time: '昨天', preview: '明天接你家那位新生？', unread: 0, reply: '',
        msgs: [
          { me: false, text: '明天接你家那位新生？', time: '周六 20:31' },
          { me: true, text: '邻居家的。别当着他面乱逗呀。', time: '周六 20:33' },
          { me: false, text: '你从上周就开始看新生报到安排了，我还不能问一句。', time: '周六 20:34' }
        ]
      },
      {
        name: '家里', color: '#a58e7a', time: '昨天', preview: '炳帆明天到学校', unread: 0, reply: '',
        msgs: [
          { me: false, text: '炳帆明天到学校。他妈妈说不用特意送，你们从小一起长大，让他自己找你去。', time: '周六 18:42' },
          { me: true, text: '我知道啦。住了这么多年隔壁，到了学校还能丢了不成。', time: '周六 18:45' }
        ]
      }
    ],
    kakao: [{
      name: '研究室通知', group: true, av: '研', color: '#778578',
      members: ['Arno', '周安信', '导师'],
      time: '昨天', preview: '周一例会照常', unread: 0, reply: '',
      msgs: [
        { me: false, from: '导师', text: '周一例会照常。新学期先把自己的计划排好，周末不用留在研究室。', time: '周六 16:00' },
        { me: true, text: '收到，老师。', time: '周六 16:06' }
      ]
    }],
    sms: [{
      name: '校园卡服务', color: '#87998e', time: '周日', preview: '新学期校园卡服务已恢复', unread: 0, reply: '',
      msgs: [{ me: false, text: '新学期校园卡服务已恢复，请按需使用校内自助服务。', time: '周日 09:00' }]
    }],
    recents: [
      { name: '陈炳帆', img: FAN_AV, type: '来电', time: '昨天 21:10', color: '#5b8def' },
      { name: '周安信', img: ANXIN_AV, type: '拨出', time: '昨天 17:32', color: '#4a90e2' }
    ],
    instagram: {
      // 开场可见的快拍只讲返校；后续关系进展由帖子和剧本逐批公开。
      stories: [
        { name: 'bingfan', img: FAN_AV, time: '1 小时前', frames: [
          { img: 'photos/bingfan-daily-2.jpg', text: '大一，报到。' },
          { img: 'photos/bingfan-casual.jpg', text: '这次不用等哥哥放假。' }
        ] },
        { name: 'arno', img: ARNO_AV, time: '3 小时前', frames: [
          { img: 'photos/arno-daily-2-v2.jpg', text: '返校。' },
          { img: 'photos/arno-daily-3-v2.jpg', text: '今天去接一个新生。' }
        ] }
      ],
      // 数组顺序为从新到旧；no 是剧本中的动态编号。
      posts: [
        {
          no: 7, user: 'arno', uimg: ARNO_AV, place: '宿舍', time: '下周日 · 20:06', likes: 38, comments: 3,
          likedBy: 'bingfan', imgs: ['photos/arno-daily-6-v2.jpg'], caption: '收到一个新室友。',
          commentList: [
            fanComment('玩偶可以常住，送玩偶的人呢？'),
            arnoComment('先来吃晚饭。', '刚刚', 'bingfan'),
            { user: '周安信', img: ANXIN_AV, text: '懂了，我以后先问有没有打扰。', time: '刚刚', likes: 4 }
          ]
        },
        {
          no: 6, user: 'bingfan', uimg: FAN_AV, place: '', time: '下周六 · 19:40', likes: 46, comments: 2,
          likedBy: 'arno', imgs: ['photos/bingfan-selfie.jpg', 'photos/bingfan-casual.jpg'], caption: '不需要补习的下午。',
          commentList: [
            arnoComment('下次也不用带题。'),
            fanComment('那我只带自己。', '刚刚', 'arno')
          ]
        },
        {
          no: 5, user: 'arno', uimg: ARNO_AV, place: '', time: '下周六 · 14:20', likes: 29, comments: 2,
          imgs: ['photos/arno-daily-5-v2.jpg'], caption: '今天下午不回研究室。',
          commentList: [
            fanComment('我知道。'),
            arnoComment('见面再聊呀。', '刚刚', 'bingfan')
          ]
        },
        {
          no: 4, user: 'bingfan', uimg: FAN_AV, place: '', time: '下周五 · 21:09', likes: 31, comments: 1,
          imgs: ['photos/bingfan-casual.jpg'], caption: '想被当成同龄人。',
          commentList: [fanComment('至少今天。')]
        },
        {
          no: 3, user: 'arno', uimg: ARNO_AV, place: '', time: '周三 · 16:10', likes: 27, comments: 3,
          likedBy: 'bingfan', imgs: ['photos/arno-daily-4-v2.jpg'], caption: '草莓买多了。有人来分吗。',
          commentList: [
            fanComment('我。'),
            { user: '周安信', img: ANXIN_AV, text: '上回我问你要，你说正好够吃。', time: '刚刚', likes: 3 },
            arnoComment('这次多买了一盒呀。', '刚刚', '周安信')
          ]
        },
        {
          no: 2, user: 'bingfan', uimg: FAN_AV, place: '大学', time: '报到日 · 15:46', likes: 34, comments: 2,
          likedBy: 'arno', imgs: ['photos/bingfan-daily-2.jpg', 'photos/bingfan-selfie.jpg'], caption: '这次不用隔着五个年级等他毕业。',
          commentList: [
            arnoComment('到校先报平安。'),
            fanComment('已经发给你啦，哥哥。', '刚刚', 'arno')
          ]
        },
        {
          no: 1, user: 'arno', uimg: ARNO_AV, place: '', time: '报到日 · 11:08', likes: 25, comments: 1,
          imgs: ['photos/arno-daily-2-v2.jpg'], caption: '研二，新学期。',
          commentList: [{ user: '周安信', img: ANXIN_AV, text: '先把咖啡钱转我，张老师。', time: '2 小时前', likes: 2 }]
        }
      ],
      dms: [{
        name: 'bingfan', img: FAN_AV, color: '#5b8def', time: '昨天', preview: '明天真的可以见面了。', unread: 0, reply: '',
        msgs: [
          { me: false, text: '明天真的可以见面了。', time: '周六 22:10' },
          { me: true, text: '昨天在家门口不是才见过吗🤭', time: '周六 22:12' },
          { me: false, text: '在学校不一样。', time: '周六 22:12' }
        ]
      }]
    },
    x: {
      profile: { ...DATA.x.profile, name: 'Arno', bio: '研二。想到什么就记一下。', posts: 0 },
      diary: []
    },
    // 素材来源记录：photos/arno-daily-sources.json 与 photos/bingfan-sources.json。
    // Arno 的 2–6 号生活照使用 -v2 版本；不使用旧棚拍素材。
    photos: [
      { img: 'photos/bingfan-daily-1.jpg' }, { img: 'photos/arno-daily-1.jpg' },
      { img: 'photos/arno-daily-2-v2.jpg' }, { img: 'photos/bingfan-daily-2.jpg' },
      { img: 'photos/arno-daily-3-v2.jpg' }, { img: 'photos/bingfan-casual.jpg' },
      { img: 'photos/arno-daily-4-v2.jpg' }, { img: 'photos/bingfan-selfie.jpg' },
      { img: 'photos/arno-daily-5-v2.jpg' }, { img: 'photos/arno-daily-6-v2.jpg' }
    ],
    play: [
      /* 01 · 到了同一所学校，先找的还是那个人。 */
      incoming('哥哥，我到你学校了。', '15:42'),
      openChat('陈炳帆'),
      incoming('不对，现在也是我的学校。', '15:42'),
      picture(false, 'photos/bingfan-daily-2.jpg', '15:43', '陈炳帆发来的生活照'),
      incoming('给你报个平安。第一条只发给你。', '15:43'),
      arno('陈炳帆同学，先去报到。哥哥不会跑掉的。', '15:44'),
      incoming('已经办好了。宿舍钥匙也领了。', '15:44'),
      incoming('我又不是小时候连练习册都要你收的小孩了。', '15:44'),
      arno('好呀。那独立的新生，现在能找到东门吗？', '15:45'),
      incoming('能。你穿什么？', '15:45'),
      picture(true, 'photos/arno-daily-3-v2.jpg', '15:46', 'Arno 穿格纹衬衫的自拍'),
      incoming('记住了。其实不用照片，我也认得出来。', '15:46'),
      { igshow: [1, 2], igpop: 2 },
      incoming('从前每次都差一点。你上大学了，我还在上初中。', '15:47'),
      arno('我现在研二，你才大一。还是得差几级呀🤭', '15:47'),
      incoming('但现在可以一起吃晚饭了。', '15:47'),
      incoming('不用算你哪天放假，也不用借口有题不会。', '15:48'),
      arno('哦？原来以前来我家，有的题是故意不会？', '15:48'),
      incoming('有的是真不会。', '15:48'),
      incoming('有的想再听你讲一遍。', '15:48'),
      other('家里', false, '你陈阿姨刚问，炳帆到学校没有？他从小就只肯跟着你。', '15:50'),
      openChat('家里'),
      other('家里', true, '到了，办完报到就来找我。晚饭我带他吃，你们放心。', '15:51'),
      other('家里', false, '好，你们两个都记得按时吃饭。', '15:51'),
      back('家里'),
      incoming('阿姨是不是问你了？我刚回过消息。', '15:52'),
      openChat('陈炳帆'),
      arno('问了。两家住了这么多年对门，你倒成了我的责任了。', '15:52'),
      incoming('那你要退货吗🥺', '15:52'),
      arno('先把晚饭领了，再研究退货政策。东门见。', '15:53'),
      incoming('来啦，豪哥。', '15:53'),
      diary('报到日 · 23:18', '他站在东门，看见我就抬手。\n明明前天还在家门口见过。\n\n但今天走近的时候，我忽然有点不知道该先接他的行李，还是先抱一下。'),

      /* 02 · 甜食和位置，都想要一份固定的。 */
      incoming('哥哥，选课表能再帮我看一眼吗？', '16:06'),
      arno('昨天看过啦。哪一门又变难了？', '16:07'),
      incoming('不是变难。', '16:07'),
      incoming('我看你昨晚和一个人一起走出图书馆。', '16:07'),
      arno('周安信呀。你报到那天见过，研究室的朋友。', '16:08'),
      incoming('我知道。我就是随便问一下。', '16:08'),
      picture(false, 'photos/bingfan-casual.jpg', '16:08', '陈炳帆发来的日常近照'),
      incoming('顺便让你看看今天的我。', '16:08'),
      { igshow: [1, 2, 3], igpop: 3 },
      incoming('草莓我先报名了。', '16:11'),
      arno('看见了。三分钟，评论、点赞、私信都来了一遍。', '16:11'),
      incoming('怕别人先领走。', '16:11'),
      other('周安信', false, '豪哥，你那个邻居弟弟问我，你周三下午是不是固定来图书馆。', '16:12'),
      openChat('周安信'),
      other('周安信', false, '我说是。他还问你旁边的位置要不要预约。', '16:12'),
      other('周安信', true, '你别逗他。留个座又不是什么大事。', '16:13'),
      other('周安信', false, '你上次可是让我自己抢座。行，我懂了。', '16:13'),
      back('周安信'),
      incoming('哥哥，我到楼下了。', '16:17'),
      openChat('陈炳帆'),
      arno('上来吧，靠窗。给你留了座，也留了草莓。', '16:18'),
      picture(true, 'photos/arno-daily-4-v2 2.jpg', '16:18', 'Arno 吃草莓时拍的照片'),
      incoming('这张也要存。', '16:18'),
      incoming('你不要看到谁都这么笑。', '16:19'),
      arno('嗯？陈同学连我吃草莓都要管了？', '16:19'),
      incoming('没有。', '16:19'),
      incoming('我是说，哥哥能不能别总在别人面前说我是小朋友。', '16:20'),
      arno('知道啦。十九岁的大人。这样叫可以吗？', '16:20'),
      incoming('你还是在笑我。', '16:20'),
      arno('因为你可爱呀。先上来，东西都给你留着呢。', '16:21'),
      incoming('那我坐你旁边。以后周三也是。', '16:21'),
      diary('周三 · 22:46', '周安信说，我买草莓之前就知道谁会来。\n我说哪有。\n\n晚上收东西，才发现自己确实只带了两个小叉子。'),

      /* 03 · 他要的不是被哥哥安抚。 */
      incoming('哥哥，你今晚去学院的讲座吗？', '20:42'),
      arno('去，帮忙收个尾。怎么啦？', '20:43'),
      incoming('海报上那个人，是你以前提过的学长吗？', '20:43'),
      arno('嗯。以前交往过，早就分开了。现在只是普通同学。', '20:44'),
      incoming('我知道你没必要向我解释。', '20:44'),
      incoming('可我还是会想问。', '20:44'),
      arno('问就问呀，我没生气。不用一句话先道歉三次。', '20:45'),
      picture(false, 'photos/bingfan-selfie.jpg', '20:45', '陈炳帆发来的自拍'),
      incoming('我本来想发这张，再问你吃不吃夜宵。', '20:45'),
      incoming('这样看起来像没事。', '20:45'),
      arno('炳帆，不高兴的话，可以直接跟我说。', '20:46'),
      incoming('说了你又要哄我，说哥哥没不要你。', '20:46'),
      incoming('然后明天还是把我当弟弟。', '20:46'),
      { igshow: [1, 2, 3, 4], igpop: 4 },
      arno('我一直以为这样能让你安心。是我想得不对吗？', '21:10'),
      incoming('你对我很好。我没有怪你。', '21:10'),
      incoming('可是我不是来学校找一个人继续照顾我的。', '21:11'),
      incoming('考这里是我自己选的。专业也是我自己选的。', '21:11'),
      incoming('想离你近一点，也是真的。', '21:11'),
      arno('嗯。我在听，你慢慢说。', '21:12'),
      incoming('我们是邻居，不是亲兄弟。差五岁，也不是差一辈。', '21:12'),
      incoming('我喜欢你。是看见你和别人亲近，会嫉妒的那种。', '21:13'),
      incoming('我就是想让你心软。以前是，现在也是。', '21:13'),
      incoming('但这次，你先别因为舍不得我难过就说好。', '21:13'),
      arno('知道啦。那今晚不哄你，给我一点时间。', '21:14'),
      incoming('也不用现在给答案。', '21:14'),
      arno('那明天下午留给我，好不好？这次我去找你。', '21:15'),
      incoming('好。不是补习，也不是顺便送东西。', '21:15'),
      diary('周五 · 23:32', '我总说他还是那个跟在我后面的小朋友。\n可他今天很认真地把选择权还给我，也把自己说清楚了。\n\n反而是我，一直用「哥哥」这个称呼躲着不回答。'),

      /* 04 · 这次是 Arno 主动约他。 */
      incoming('哥哥，我带不带电脑？', '14:18'),
      arno('不带。今天不讲题，也不检查你的课表。', '14:19'),
      incoming('那我带自己就好了？', '14:19'),
      picture(true, 'photos/arno-daily-5-v2.jpg', '14:20', 'Arno 穿米色 Polo 衫的手机自拍'),
      arno('嗯。还有这位来接你的人，好好看一下。', '14:20'),
      incoming('已经看了。', '14:20'),
      incoming('你是不是想让我问，今天算什么。', '14:20'),
      arno('不等你猜了。想正式约你出去，算约会。', '14:21'),
      incoming('哥哥。你确定吗？', '14:21'),
      arno('确定。昨晚想过很多次，今天还是想来见你。', '14:22'),
      incoming('那我也正式答应。', '14:22'),
      { igshow: [1, 2, 3, 4, 5], igpop: 5 },
      other('家里', false, '周末要不要和炳帆一起回来吃饭？他妈妈今天问起了。', '14:24'),
      openChat('家里'),
      other('家里', true, '今天约了炳帆出去。下次我们再一起回去，提前告诉你们。', '14:25'),
      other('家里', false, '行，别为了赶车弄得那么累。你们自己安排好。', '14:25'),
      back('家里'),
      incoming('你还没出门，我已经在楼下了。', '14:27'),
      openChat('陈炳帆'),
      arno('这么积极呀。我下来了，今天不用站远远等。', '14:28'),
      incoming('那有件事，我想先坦白。', '14:28'),
      incoming('我问安信哥你的课表，不只是为了问题。', '14:28'),
      incoming('还有好多次，我明明知道怎么走，还是问你来不来接。', '14:29'),
      arno('猜到一点。以后想见我，直接约，好不好？', '14:29'),
      incoming('好。那我现在直接问。', '14:30'),
      incoming('等会儿过马路，可以牵你的手吗？', '14:30'),
      arno('可以。没过马路也可以。', '14:30'),
      incoming('我看见你了。', '14:31'),
      incoming('这次我不站远远的。', '14:31'),
      diary('周六 · 18:58', '他过完马路还没松手，小声问，这样会不会太黏。\n我说不会。\n\n其实我也在想，如果他松开，我该找什么理由再牵一次。'),

      /* 05 · 同一个称呼，终于有了另一层意思。 */
      picture(false, FAN_AV, '19:16', '陈炳帆发给 Arno 的生活照'),
      incoming('哥哥，今天也想见你。', '19:16'),
      arno('今天不用先问一道题了？', '19:17'),
      incoming('不问。', '19:17'),
      incoming('但有个问题跟学习没关系。', '19:17'),
      incoming('室友问照片下面的 arno 是不是我哥哥。我说是，又觉得不完整。', '19:18'),
      arno('可以补一句。是从小认识的邻居，现在也是男朋友。', '19:18'),
      incoming('我刚才把这句话念出来了。', '19:18'),
      incoming('他们都听见了。', '19:18'),
      { igshow: [1, 2, 3, 4, 5, 6], igpop: 6 },
      arno('哎呀。那你得负责解释一下，我没替你写过作业。', '19:19'),
      incoming('解释完了。顺便说了是我先追的你。', '19:19'),
      incoming('我可以要一个置顶吗？', '19:20'),
      arno('你不是一直排在最上面吗🤭', '19:20'),
      incoming('那我以前问你，为什么每次都回得这么快，你还说刚好看手机。', '19:20'),
      arno('以后换个说法。因为想看你的消息。', '19:21'),
      incoming('哥哥，你原来也会嘴硬。', '19:21'),
      incoming('还有一件事。你以后能不能少对我说乖。', '19:22'),
      arno('怎么，又嫌哥哥把你当小孩呀？', '19:22'),
      incoming('不是。怕我一听，就什么都肯答应你。', '19:22'),
      incoming('我本来想好好多话，要你慢慢哄我的。', '19:22'),
      arno('那先留着，晚饭来我这里吃。想听你当面讲。', '19:23'),
      incoming('那周三的靠窗位置，还留给我吗？', '19:23'),
      arno('留给你。先各自上课，下午一起吃草莓。', '19:24'),
      incoming('好。我先去交小组作业，抱着那个绿色玩偶一起来。', '19:24'),
      incoming('它只是礼物。你别只顾着抱它。', '19:24'),
      { gate: 'home', reminder: '周三 · 和炳帆在图书馆见，记得买草莓' },
      { igshow: [1, 2, 3, 4, 5, 6, 7], igpop: 7 },
      diary('周日 · 20:18', '他说玩偶只是礼物，让我别只顾着抱它。\n人还没来，连玩偶的醋都先吃上了。\n\n我把两双筷子放好。以前也常这样等他来，今天却想再看一眼镜子。'),
    ]
  });
})();
