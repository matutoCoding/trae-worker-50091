// Mock数据 - 候鸟保护区监测系统

const MockData = {
    // 概览统计数据
    overview: {
        totalSpecies: 286,
        totalBirds: 15847,
        observationSites: 24,
        patrolToday: 8,
        rescueThisMonth: 23,
        releasedThisYear: 156,
        waterSites: 6,
        restorationProjects: 4
    },

    // 观测站点数据
    observationSites: [
        { id: 'OS001', name: '东湖观测站', location: '东湖湿地', lat: 30.5521, lng: 114.3752, type: '湖泊湿地', status: 'online', equipment: '高清摄像机×2, 声音监测仪×1', lastUpdate: '2024-01-15 08:30' },
        { id: 'OS002', name: '西湖观测站', location: '西湖保护区', lat: 30.5489, lng: 114.3567, type: '湖泊湿地', status: 'online', equipment: '高清摄像机×3, 气象站×1', lastUpdate: '2024-01-15 08:28' },
        { id: 'OS003', name: '南岸滩涂站', location: '南岸滩涂区', lat: 30.5356, lng: 114.3890, type: '滩涂湿地', status: 'online', equipment: '红外相机×4, 自动计数仪×1', lastUpdate: '2024-01-15 08:25' },
        { id: 'OS004', name: '北港观测站', location: '北港航道区', lat: 30.5789, lng: 114.3456, type: '河流湿地', status: 'warning', equipment: '高清摄像机×2', lastUpdate: '2024-01-15 07:45' },
        { id: 'OS005', name: '芦苇荡观测点', location: '东部芦苇荡', lat: 30.5634, lng: 114.4012, type: '沼泽湿地', status: 'online', equipment: '声音监测仪×2', lastUpdate: '2024-01-15 08:32' },
        { id: 'OS006', name: '湖心岛站', location: '湖心岛保护区', lat: 30.5567, lng: 114.3678, type: '岛屿栖息地', status: 'offline', equipment: '高清摄像机×1', lastUpdate: '2024-01-14 16:20' },
        { id: 'OS007', name: '西滩观察点', location: '西侧滩涂', lat: 30.5423, lng: 114.3345, type: '滩涂湿地', status: 'online', equipment: '红外相机×2', lastUpdate: '2024-01-15 08:15' },
        { id: 'OS008', name: '东河观测站', location: '东河入湖区', lat: 30.5701, lng: 114.3923, type: '河流湿地', status: 'online', equipment: '高清摄像机×2, 水质监测仪×1', lastUpdate: '2024-01-15 08:20' }
    ],

    // 鸟类物种数据
    species: [
        { id: 'SP001', name: '丹顶鹤', latinName: 'Grus japonensis', category: '鹤形目', protectionLevel: '国家一级', description: '大型涉禽，体羽主要为白色，头顶鲜红色，喉和颈黑色。', imageUrl: '', population: 42, status: '濒危' },
        { id: 'SP002', name: '东方白鹳', latinName: 'Ciconia boyciana', category: '鹳形目', protectionLevel: '国家一级', description: '大型涉禽，全身白色，翅膀大覆羽为黑色，嘴长而粗壮。', imageUrl: '', population: 78, status: '濒危' },
        { id: 'SP003', name: '白琵鹭', latinName: 'Platalea leucorodia', category: '鹳形目', protectionLevel: '国家二级', description: '大型涉禽，全身白色，嘴长而直，上下扁平，前端扩大呈匙状。', imageUrl: '', population: 156, status: '易危' },
        { id: 'SP004', name: '小天鹅', latinName: 'Cygnus columbianus', category: '雁形目', protectionLevel: '国家二级', description: '大型水禽，全身白色，嘴黑色，基部有黄色斑块。', imageUrl: '', population: 234, status: '无危' },
        { id: 'SP005', name: '鸿雁', latinName: 'Anser cygnoides', category: '雁形目', protectionLevel: '国家二级', description: '大型水禽，嘴黑色，体色浅灰褐色，头顶到后颈暗棕褐色。', imageUrl: '', population: 1289, status: '易危' },
        { id: 'SP006', name: '豆雁', latinName: 'Anser fabalis', category: '雁形目', protectionLevel: '三有保护', description: '中型雁类，雌雄相似。头、颈灰褐色，肩和翅膀灰褐色。', imageUrl: '', population: 3456, status: '无危' },
        { id: 'SP007', name: '灰鹤', latinName: 'Grus grus', category: '鹤形目', protectionLevel: '国家二级', description: '大型涉禽，全身羽毛大都灰色，头顶裸出皮肤鲜红色。', imageUrl: '', population: 167, status: '无危' },
        { id: 'SP008', name: '普通鸬鹚', latinName: 'Phalacrocorax carbo', category: '鹈形目', protectionLevel: '三有保护', description: '大型水鸟，通体黑色，头颈具紫绿色光泽，两肩和翅膀具青铜色光彩。', imageUrl: '', population: 578, status: '无危' },
        { id: 'SP009', name: '白鹭', latinName: 'Egretta garzetta', category: '鹳形目', protectionLevel: '三有保护', description: '中型涉禽，通体白色，嘴黑色，腿黑色，趾黄色。', imageUrl: '', population: 892, status: '无危' },
        { id: 'SP010', name: '苍鹭', latinName: 'Ardea cinerea', category: '鹳形目', protectionLevel: '三有保护', description: '大型涉禽，头、颈、脚和嘴均甚长，上半身主要为灰色。', imageUrl: '', population: 456, status: '无危' },
        { id: 'SP011', name: '红嘴鸥', latinName: 'Chroicocephalus ridibundus', category: '鸻形目', protectionLevel: '三有保护', description: '中型水鸟，嘴和脚皆为红色，身体大部分羽毛为白色。', imageUrl: '', population: 2341, status: '无危' },
        { id: 'SP012', name: '白骨顶', latinName: 'Fulica atra', category: '鹤形目', protectionLevel: '三有保护', description: '中型游禽，通体黑色，嘴和额甲白色，趾间具瓣蹼。', imageUrl: '', population: 1023, status: '无危' }
    ],

    // 观测记录
    speciesRecords: [
        { id: 'SR001', speciesId: 'SP001', speciesName: '丹顶鹤', siteId: 'OS001', siteName: '东湖观测站', observationDate: '2024-01-15 07:30', count: 12, observer: '张明', notes: '群体在东岸觅食', photos: [] },
        { id: 'SR002', speciesId: 'SP002', speciesName: '东方白鹳', siteId: 'OS003', siteName: '南岸滩涂站', observationDate: '2024-01-15 06:45', count: 23, observer: '李华', notes: '发现一只带有环志的个体', photos: [] },
        { id: 'SR003', speciesId: 'SP004', speciesName: '小天鹅', siteId: 'OS002', siteName: '西湖观测站', observationDate: '2024-01-15 08:00', count: 87, observer: '王芳', notes: '大群在湖面游动', photos: [] },
        { id: 'SR004', speciesId: 'SP005', speciesName: '鸿雁', siteId: 'OS005', siteName: '芦苇荡观测点', observationDate: '2024-01-14 16:30', count: 156, observer: '赵强', notes: '傍晚归巢', photos: [] },
        { id: 'SR005', speciesId: 'SP007', speciesName: '灰鹤', siteId: 'OS001', siteName: '东湖观测站', observationDate: '2024-01-14 10:20', count: 34, observer: '张明', notes: '在浅水区觅食', photos: [] },
        { id: 'SR006', speciesId: 'SP009', speciesName: '白鹭', siteId: 'OS004', siteName: '北港观测站', observationDate: '2024-01-14 09:15', count: 78, observer: '陈伟', notes: '沿岸线分布', photos: [] }
    ],

    // 环志数据
    birdRings: [
        { id: 'BR001', ringNumber: 'H2023-01456', speciesId: 'SP002', speciesName: '东方白鹳', ringDate: '2023-03-15', ringLocation: '北戴河环志站', ringPerson: '刘教授', status: '已回收' },
        { id: 'BR002', ringNumber: 'H2023-01457', speciesId: 'SP001', speciesName: '丹顶鹤', ringDate: '2023-04-20', ringLocation: '扎龙自然保护区', ringPerson: '王研究员', status: '监测中' },
        { id: 'BR003', ringNumber: 'H2022-08923', speciesId: 'SP005', speciesName: '鸿雁', ringDate: '2022-09-10', ringLocation: '洞庭湖', ringPerson: '李博士', status: '已回收' },
        { id: 'BR004', ringNumber: 'H2023-02134', speciesId: 'SP007', speciesName: '灰鹤', ringDate: '2023-10-05', ringLocation: '盐城保护区', ringPerson: '张老师', status: '监测中' },
        { id: 'BR005', ringNumber: 'H2021-05678', speciesId: 'SP003', speciesName: '白琵鹭', ringDate: '2021-11-20', ringLocation: '崇明东滩', ringPerson: '陈教授', status: '已回收' }
    ],

    // 环志回收记录
    ringRecoveries: [
        { id: 'RR001', ringId: 'BR001', ringNumber: 'H2023-01456', speciesName: '东方白鹳', recoveryDate: '2024-01-12', recoveryLocation: '本保护区南岸滩涂', recoveryMethod: '观鸟记录', condition: '健康', finder: '李华' },
        { id: 'RR002', ringId: 'BR003', ringNumber: 'H2022-08923', speciesName: '鸿雁', recoveryDate: '2023-12-28', recoveryLocation: '本保护区东湖', recoveryMethod: '红外相机', condition: '健康', finder: '张明' },
        { id: 'RR003', ringId: 'BR005', ringNumber: 'H2021-05678', speciesName: '白琵鹭', recoveryDate: '2023-11-15', recoveryLocation: '本保护区西湖', recoveryMethod: '望远镜观察', condition: '健康', finder: '王芳' }
    ],

    // 迁徙节律数据
    migrationRhythm: [
        { month: '1月', arrival: 2340, departure: 120, stay: 15600 },
        { month: '2月', arrival: 1560, departure: 890, stay: 16270 },
        { month: '3月', arrival: 890, departure: 4560, stay: 12600 },
        { month: '4月', arrival: 340, departure: 6780, stay: 6160 },
        { month: '5月', arrival: 120, departure: 2340, stay: 3940 },
        { month: '6月', arrival: 45, departure: 890, stay: 3095 },
        { month: '7月', arrival: 67, departure: 234, stay: 2928 },
        { month: '8月', arrival: 234, departure: 156, stay: 3006 },
        { month: '9月', arrival: 1234, departure: 89, stay: 4151 },
        { month: '10月', arrival: 4567, departure: 234, stay: 8484 },
        { month: '11月', arrival: 3456, departure: 567, stay: 11373 },
        { month: '12月', arrival: 890, departure: 1234, stay: 11029 }
    ],

    // 迁徙路线
    migrationRoutes: [
        {
            id: 'MR001',
            speciesId: 'SP001',
            speciesName: '丹顶鹤',
            season: '秋季迁徙',
            direction: '南迁',
            stops: [
                { site: '扎龙自然保护区', date: '2023-10-15', lat: 47.148, lng: 124.366, stayDays: 0 },
                { site: '向海自然保护区', date: '2023-10-22', lat: 45.267, lng: 122.183, stayDays: 5 },
                { site: '北戴河', date: '2023-11-02', lat: 39.833, lng: 119.483, stayDays: 3 },
                { site: '黄河三角洲', date: '2023-11-10', lat: 37.767, lng: 119.017, stayDays: 7 },
                { site: '本保护区', date: '2023-11-20', lat: 30.552, lng: 114.375, stayDays: 120 },
                { site: '鄱阳湖', date: '2024-03-20', lat: 29.167, lng: 116.083, stayDays: 0 }
            ]
        },
        {
            id: 'MR002',
            speciesId: 'SP005',
            speciesName: '鸿雁',
            season: '秋季迁徙',
            direction: '南迁',
            stops: [
                { site: '西伯利亚', date: '2023-09-01', lat: 55.0, lng: 120.0, stayDays: 0 },
                { site: '呼伦贝尔', date: '2023-09-15', lat: 49.217, lng: 119.767, stayDays: 10 },
                { site: '科尔沁', date: '2023-10-01', lat: 43.617, lng: 122.267, stayDays: 5 },
                { site: '白洋淀', date: '2023-10-15', lat: 38.917, lng: 116.033, stayDays: 7 },
                { site: '本保护区', date: '2023-10-28', lat: 30.552, lng: 114.375, stayDays: 45 },
                { site: '洞庭湖', date: '2023-12-15', lat: 29.083, lng: 112.933, stayDays: 0 }
            ]
        }
    ],

    // 巡护任务
    patrolTasks: [
        { id: 'PT001', taskName: '东湖日常巡护', startDate: '2024-01-15 08:00', endDate: '2024-01-15 12:00', patroller: '张明', status: '进行中', route: '东湖周边步道', distance: 5.2 },
        { id: 'PT002', taskName: '南岸滩涂巡护', startDate: '2024-01-15 06:30', endDate: '2024-01-15 10:30', patroller: '李华', status: '已完成', route: '南岸滩涂线', distance: 7.8 },
        { id: 'PT003', taskName: '夜间防盗巡查', startDate: '2024-01-15 22:00', endDate: '2024-01-16 02:00', patroller: '赵强', status: '待开始', route: '北线重点区域', distance: 8.5 },
        { id: 'PT004', taskName: '西湖区域巡护', startDate: '2024-01-14 09:00', endDate: '2024-01-14 14:00', patroller: '王芳', status: '已完成', route: '西湖环线', distance: 6.4 },
        { id: 'PT005', taskName: '芦苇荡专项调查', startDate: '2024-01-14 07:30', endDate: '2024-01-14 11:30', patroller: '陈伟', status: '已完成', route: '芦苇荡步道', distance: 3.2 }
    ],

    // 巡护轨迹点（示例数据）
    patrolTracks: {
        PT001: [
            { time: '08:00', lat: 30.5521, lng: 114.3752 },
            { time: '08:15', lat: 30.5545, lng: 114.3789 },
            { time: '08:30', lat: 30.5578, lng: 114.3821 },
            { time: '08:45', lat: 30.5601, lng: 114.3845 },
            { time: '09:00', lat: 30.5623, lng: 114.3867 },
            { time: '09:15', lat: 30.5645, lng: 114.3889 },
            { time: '09:30', lat: 30.5667, lng: 114.3912 },
            { time: '09:45', lat: 30.5689, lng: 114.3934 },
            { time: '10:00', lat: 30.5701, lng: 114.3956 }
        ]
    },

    // 盗猎防控记录
    preventionRecords: [
        { id: 'PR001', date: '2024-01-12', type: '巡逻发现', location: '北岸偏僻区域', description: '发现捕鸟网一张，已拆除', handler: '赵强', status: '已处理', severity: '一般' },
        { id: 'PR002', date: '2024-01-08', type: '群众举报', location: '西湖西侧', description: '有人非法捕捞，已劝离并教育', handler: '李华', status: '已处理', severity: '轻微' },
        { id: 'PR003', date: '2024-01-05', type: '监控发现', location: '东南角围栏', description: '发现可疑人员逗留，已派巡逻队前往', handler: '张明', status: '处理中', severity: '严重' }
    ],

    // 水位监测点
    waterSites: [
        { id: 'WS001', name: '东湖水位站', location: '东湖中心', currentLevel: 18.5, warningLevel: 20.0, criticalLevel: 21.5, status: '正常', lastUpdate: '2024-01-15 08:00' },
        { id: 'WS002', name: '西湖水位站', location: '西湖中心', currentLevel: 17.8, warningLevel: 19.5, criticalLevel: 21.0, status: '正常', lastUpdate: '2024-01-15 08:00' },
        { id: 'WS003', name: '南滩水位站', location: '南岸滩涂', currentLevel: 2.3, warningLevel: 3.0, criticalLevel: 4.0, status: '正常', lastUpdate: '2024-01-15 07:30' },
        { id: 'WS004', name: '北港水位站', location: '北港航道', currentLevel: 15.2, warningLevel: 16.5, criticalLevel: 18.0, status: '正常', lastUpdate: '2024-01-15 08:00' }
    ],

    // 水位历史数据
    waterLevelHistory: [
        { date: '01-09', eastLake: 18.2, westLake: 17.5, southBeach: 2.1 },
        { date: '01-10', eastLake: 18.3, westLake: 17.6, southBeach: 2.1 },
        { date: '01-11', eastLake: 18.4, westLake: 17.7, southBeach: 2.2 },
        { date: '01-12', eastLake: 18.5, westLake: 17.8, southBeach: 2.2 },
        { date: '01-13', eastLake: 18.6, westLake: 17.9, southBeach: 2.3 },
        { date: '01-14', eastLake: 18.5, westLake: 17.8, southBeach: 2.3 },
        { date: '01-15', eastLake: 18.5, westLake: 17.8, southBeach: 2.3 }
    ],

    // 栖息地修复项目
    restorationProjects: [
        { id: 'RP001', name: '东岸湿地修复工程', startDate: '2023-06-01', endDate: '2024-03-31', status: '进行中', progress: 65, area: 120, description: '恢复东岸湿地生态系统，种植原生植物', manager: '王教授' },
        { id: 'RP002', name: '鸟类栖息地优化', startDate: '2023-09-01', endDate: '2023-12-31', status: '已完成', progress: 100, area: 85, description: '优化鸟类栖息环境，增加隐蔽性', manager: '李博士' },
        { id: 'RP003', name: '芦苇荡生态恢复', startDate: '2024-01-01', endDate: '2024-06-30', status: '进行中', progress: 15, area: 200, description: '恢复芦苇荡湿地，提供水鸟栖息场所', manager: '张工程师' },
        { id: 'RP004', name: '滩涂微地形改造', startDate: '2023-03-01', endDate: '2023-08-31', status: '已完成', progress: 100, area: 150, description: '改造滩涂地形，创造多样化栖息环境', manager: '陈教授' }
    ],

    // 救助记录
    rescueRecords: [
        { id: 'RR001', speciesName: '东方白鹳', rescueDate: '2024-01-14', rescueLocation: '南岸滩涂区', injuryType: '翅膀受伤', injuryDegree: '中度', rescuer: '李华', status: '治疗中', age: '成鸟', gender: '雌性' },
        { id: 'RR002', speciesName: '苍鹭', rescueDate: '2024-01-12', rescueLocation: '北港附近', injuryType: '腿部骨折', injuryDegree: '严重', rescuer: '赵强', status: '康复中', age: '成鸟', gender: '雄性' },
        { id: 'RR003', speciesName: '小天鹅', rescueDate: '2024-01-10', rescueLocation: '西湖中央', injuryType: '误食异物', injuryDegree: '轻度', rescuer: '王芳', status: '已放归', age: '亚成体', gender: '未知' },
        { id: 'RR004', speciesName: '白鹭', rescueDate: '2024-01-08', rescueLocation: '东湖东岸', injuryType: '翅膀扭伤', injuryDegree: '轻度', rescuer: '张明', status: '已放归', age: '成鸟', gender: '雄性' },
        { id: 'RR005', speciesName: '普通鸬鹚', rescueDate: '2024-01-05', rescueLocation: '湖心岛', injuryType: '渔网缠绕', injuryDegree: '中度', rescuer: '陈伟', status: '治疗中', age: '成鸟', gender: '未知' }
    ],

    // 治疗日志
    treatmentLogs: [
        { id: 'TL001', rescueId: 'RR001', logDate: '2024-01-14', treatment: '伤口清理消毒，抗生素注射', status: '病情稳定', notes: '初步检查，右翅有明显外伤' },
        { id: 'TL002', rescueId: 'RR001', logDate: '2024-01-15', treatment: '换药，补充维生素', status: '恢复良好', notes: '进食正常，精神状态良好' },
        { id: 'TL003', rescueId: 'RR002', logDate: '2024-01-12', treatment: '腿部固定手术', status: '术后观察', notes: '手术成功，需要静养' },
        { id: 'TL004', rescueId: 'RR002', logDate: '2024-01-13', treatment: '消炎止痛治疗', status: '逐渐恢复', notes: '可短暂站立' },
        { id: 'TL005', rescueId: 'RR002', logDate: '2024-01-15', treatment: '复查和换药', status: '恢复良好', notes: '骨折愈合情况良好' }
    ],

    // 放归记录
    releaseRecords: [
        { id: 'RL001', rescueId: 'RR003', speciesName: '小天鹅', releaseDate: '2024-01-15', releaseLocation: '东湖湿地', healthAssessment: '完全康复，具备野外生存能力', releaser: '王芳', notes: '放归时状态良好，加入了一个小天鹅群体' },
        { id: 'RL002', rescueId: 'RR004', speciesName: '白鹭', releaseDate: '2024-01-12', releaseLocation: '东岸湿地', healthAssessment: '伤愈，飞行能力恢复', releaser: '张明', notes: '放归后立即飞入芦苇荡' }
    ],

    // 科普文章
    scienceArticles: [
        { id: 'SA001', title: '候鸟迁徙的秘密：它们如何找到回家的路？', category: '迁徙知识', author: '王教授', date: '2024-01-10', summary: '候鸟在迁徙过程中展现出惊人的导航能力，它们是如何做到的呢？本文将为您揭秘...', views: 1256, likes: 89 },
        { id: 'SA002', title: '湿地生态系统：地球之肾的重要性', category: '生态保护', author: '李博士', date: '2024-01-08', summary: '湿地被誉为"地球之肾"，在净化水质、调节气候、维护生物多样性等方面发挥着重要作用...', views: 987, likes: 67 },
        { id: 'SA003', title: '观鸟入门指南：如何开始你的观鸟之旅', category: '观鸟技巧', author: '张老师', date: '2024-01-05', summary: '观鸟是一项有益身心的户外活动，本文将为初学者介绍观鸟的基本知识和技巧...', views: 2341, likes: 156 },
        { id: 'SA004', title: '丹顶鹤：优雅的湿地精灵', category: '物种介绍', author: '陈研究员', date: '2024-01-03', summary: '丹顶鹤是国家一级保护动物，被誉为"湿地之神"，让我们一起来了解这种优雅的鸟类...', views: 3567, likes: 234 },
        { id: 'SA005', title: '冬季候鸟观察：哪些鸟会来我们这里过冬？', category: '季节观察', author: '刘专家', date: '2023-12-28', summary: '每年冬季，大量候鸟从北方飞到南方越冬，本指南介绍了常见的冬候鸟种类...', views: 1890, likes: 123 }
    ],

    // 数据上报记录
    reportRecords: [
        { id: 'REP001', title: '2024年1月中旬水鸟同步调查', reporter: '张明', reportDate: '2024-01-15', type: '物种调查', status: '已审核', attachment: 'survey_report_202401.pdf' },
        { id: 'REP002', title: '12月巡护工作总结', reporter: '李华', reportDate: '2024-01-02', type: '巡护报告', status: '已审核', attachment: 'patrol_summary_dec.docx' },
        { id: 'REP003', title: '东岸湿地修复进度报告', reporter: '王教授', reportDate: '2024-01-10', type: '项目汇报', status: '待审核', attachment: 'restoration_progress.xlsx' },
        { id: 'REP004', title: '2023年度救助工作总结', reporter: '赵强', reportDate: '2024-01-08', type: '工作总结', status: '已审核', attachment: 'rescue_annual_2023.pdf' }
    ],

    // 近期活动时间线
    recentActivities: [
        { id: 'ACT001', type: '观测', title: '发现东方白鹳群体', time: '2小时前', description: '在南岸滩涂观测到23只东方白鹳', icon: 'fa-binoculars', color: 'primary' },
        { id: 'ACT002', type: '救助', title: '新救助一只苍鹭', time: '5小时前', description: '北港附近发现受伤苍鹭，已送往救助中心', icon: 'fa-heartbeat', color: 'rose' },
        { id: 'ACT003', type: '巡护', title: '完成夜间巡护', time: '8小时前', description: '夜间巡护未发现异常情况', icon: 'fa-hiking', color: 'sky' },
        { id: 'ACT004', type: '环志', title: '回收环志记录', time: '昨天', description: '回收东方白鹳环志H2023-01456', icon: 'fa-ring', color: 'accent' },
        { id: 'ACT005', type: '放归', title: '小天鹅成功放归', time: '昨天', description: '康复的小天鹅已放归自然', icon: 'fa-dove', color: 'primary' }
    ]
};

// 保护级别颜色映射
const protectionLevelColors = {
    '国家一级': 'bg-rose-100 text-rose-700',
    '国家二级': 'bg-amber-100 text-amber-700',
    '三有保护': 'bg-emerald-100 text-emerald-700'
};

// 状态颜色映射
const statusColors = {
    'online': 'status-online',
    'offline': 'status-offline',
    'warning': 'status-warning',
    '正常': 'status-online',
    '进行中': 'status-pending',
    '已完成': 'status-online',
    '待开始': 'status-warning',
    '治疗中': 'status-warning',
    '康复中': 'status-pending',
    '已放归': 'status-online',
    '已处理': 'status-online',
    '处理中': 'status-warning',
    '已审核': 'status-online',
    '待审核': 'status-warning',
    '监测中': 'status-pending',
    '已回收': 'status-online',
    '濒危': 'bg-rose-100 text-rose-700',
    '易危': 'bg-amber-100 text-amber-700',
    '无危': 'bg-emerald-100 text-emerald-700'
};
