// 英文为默认语言；未来可添加 zh 配置并按路由选择。
export const profile = {
  locale: 'en',
  name: 'Matvey Wang', // 来自原网站，正式姓名拼写可在此修改。
  initials: 'MW',
  role: 'PhD student', // 用户指定的身份；机构等尚未提供。
  institution: 'Technology and Engineering Center for Space Utilization,Chinese Academy of Sciences',
  department: 'POAC',
  location: 'Beijing',
  description: 'The academic homepage of Matvey Wang. Research, publications, projects, and updates.',
  introduction: 'Welcome to my academic homepage. This is a place for my research, publications, and ongoing projects.',
  biography: [
    'A personal biography will be added here. This space will introduce my academic background, current work, and the questions that motivate my research.',
  ],
  biographyIsPlaceholder: true,
  interests: ['Research interests to be added'],
  avatar: '/images/avatar-placeholder.svg',
  avatarAlt: 'MW monogram — placeholder for a portrait of Matvey Wang',
  avatarIsPlaceholder: true,
  email: '',
  links: {
    github: 'https://github.com/matveywang',
    scholar: '',
    orcid: '',
  },
  cv: { url: '', updated: '' }, // 上传 public/cv.pdf 后填写 /cv.pdf。
  education: [
    { degree: 'Degree to be added', institution: 'Institution to be added', period: 'Dates to be added', placeholder: true },
  ],
  research: [
    { title: 'Research direction to be added', description: 'Replace this example with a research question, your approach, and its broader significance.', tags: ['Topic to be added'], placeholder: true },
  ],
};
