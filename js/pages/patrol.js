// 巡护管理模块

const PatrolPage = {
    renderTracks(container) {
        const currentTask = MockData.patrolTasks[1];
        
        container.innerHTML = `
            <div class="mb-6 flex items-center justify-between">
                <div>
                    <h2 class="text-2xl font-serif font-semibold text-slate-800 mb-1">路线轨迹</h2>
                    <p class="text-slate-500 text-sm">查看巡护路线轨迹和详细记录</p>
                </div>
                <div class="flex items-center gap-3">
                    <select class="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500">
                        ${MockData.patrolTasks.map(task => `
                            <option value="${task.id}">${task.taskName}</option>
                        `).join('')}
                    </select>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-4 gap-5">
                <div class="lg:col-span-3">
                    <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div class="p-4 border-b border-slate-100 flex items-center justify-between">
                            <div>
                                <h3 class="font-semibold text-slate-800">${currentTask.taskName}</h3>
                                <p class="text-sm text-slate-500">巡护员: ${currentTask.patroller}</p>
                            </div>
                            <div class="flex items-center gap-2">
                                <button class="p-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors">
                                    <i class="fas fa-play"></i>
                                </button>
                                <button class="p-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
                                    <i class="fas fa-backward"></i>
                                </button>
                                <button class="p-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
                                    <i class="fas fa-forward"></i>
                                </button>
                                <span class="px-3 py-1.5 bg-slate-100 rounded-lg text-sm text-slate-600 font-mono">0.5x</span>
                            </div>
                        </div>
                        <div id="trackMap" class="h-[450px]"></div>
                    </div>
                </div>

                <div class="space-y-4">
                    <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                        <h3 class="font-semibold text-slate-800 mb-4">巡护统计</h3>
                        <div class="space-y-4">
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-slate-500">总里程</span>
                                <span class="text-lg font-bold text-slate-800">${currentTask.distance} km</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-slate-500">时长</span>
                                <span class="text-lg font-bold text-slate-800">4 小时</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-slate-500">平均速度</span>
                                <span class="text-lg font-bold text-slate-800">3.2 km/h</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-slate-500">最高海拔</span>
                                <span class="text-lg font-bold text-slate-800">45 m</span>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                        <h3 class="font-semibold text-slate-800 mb-4">巡护时间轴</h3>
                        <div class="space-y-3">
                            <div class="relative pl-6">
                                <div class="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-emerald-500"></div>
                                <p class="text-sm text-slate-700">开始巡护</p>
                                <p class="text-xs text-slate-400">08:00 · 东湖观测站</p>
                            </div>
                            <div class="relative pl-6">
                                <div class="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-sky-500"></div>
                                <p class="text-sm text-slate-700">发现鸟群</p>
                                <p class="text-xs text-slate-400">08:45 · 东岸芦苇荡</p>
                            </div>
                            <div class="relative pl-6">
                                <div class="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-amber-500"></div>
                                <p class="text-sm text-slate-700">发现异常</p>
                                <p class="text-xs text-slate-400">09:20 · 北岸滩涂</p>
                            </div>
                            <div class="relative pl-6 pb-2">
                                <div class="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-rose-500"></div>
                                <p class="text-sm text-slate-700">巡护结束</p>
                                <p class="text-xs text-slate-400">12:00 · 终点位置</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.initTrackMap();
    },

    initTrackMap() {
        const mapContainer = document.getElementById('trackMap');
        if (!mapContainer) return;

        const task = MockData.patrolTasks[1];
        const tracks = MockData.patrolTracks.PT001 || [
            { time: '08:00', lat: 30.5521, lng: 114.3752 },
            { time: '08:15', lat: 30.5545, lng: 114.3789 },
            { time: '08:30', lat: 30.5578, lng: 114.3821 },
            { time: '08:45', lat: 30.5601, lng: 114.3845 },
            { time: '09:00', lat: 30.5623, lng: 114.3867 },
            { time: '09:15', lat: 30.5645, lng: 114.3889 },
            { time: '09:30', lat: 30.5667, lng: 114.3912 },
            { time: '10:00', lat: 30.5701, lng: 114.3956 }
        ];

        const map = L.map('trackMap').setView([30.56, 114.385], 13);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        const latlngs = tracks.map(t => [t.lat, t.lng]);

        L.polyline(latlngs, {
            color: '#0d9488',
            weight: 4,
            opacity: 0.9,
            lineJoin: 'round',
            lineCap: 'round'
        }).addTo(map);

        const startIcon = L.divIcon({
            className: 'start-marker',
            html: '<div style="width: 32px; height: 32px; background: #10b981; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-size: 12px;"><i class="fas fa-play"></i></div>',
            iconSize: [32, 32],
            iconAnchor: [16, 16]
        });
        L.marker([tracks[0].lat, tracks[0].lng], { icon: startIcon }).addTo(map)
            .bindPopup(`<b>起点</b><br>${tracks[0].time}<br>${task.patroller}`);

        const endIcon = L.divIcon({
            className: 'end-marker',
            html: '<div style="width: 32px; height: 32px; background: #f43f5e; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-size: 12px;"><i class="fas fa-flag-checkered"></i></div>',
            iconSize: [32, 32],
            iconAnchor: [16, 16]
        });
        L.marker([tracks[tracks.length - 1].lat, tracks[tracks.length - 1].lng], { icon: endIcon }).addTo(map)
            .bindPopup(`<b>终点</b><br>${tracks[tracks.length - 1].time}`);

        map.fitBounds(L.latLngBounds(latlngs), { padding: [30, 30] });

        App.maps.track = map;
    },

    renderTasks(container) {
        container.innerHTML = `
            <div class="mb-6 flex items-center justify-between">
                <div>
                    <h2 class="text-2xl font-serif font-semibold text-slate-800 mb-1">任务管理</h2>
                    <p class="text-slate-500 text-sm">管理巡护任务分配和进度</p>
                </div>
                <div class="flex items-center gap-2">
                    <button class="btn btn-secondary">
                        <i class="fas fa-calendar-alt"></i>
                        排班管理
                    </button>
                    <button class="btn btn-primary">
                        <i class="fas fa-plus"></i>
                        新建任务
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center gap-4">
                    <div class="w-10 h-10 bg-sky-50 rounded-lg flex items-center justify-center">
                        <i class="fas fa-list-check text-sky-500"></i>
                    </div>
                    <div>
                        <p class="text-2xl font-bold text-slate-800">${MockData.patrolTasks.length}</p>
                        <p class="text-xs text-slate-500">总任务数</p>
                    </div>
                </div>
                <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center gap-4">
                    <div class="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                        <i class="fas fa-spinner text-amber-500"></i>
                    </div>
                    <div>
                        <p class="text-2xl font-bold text-slate-800">${MockData.patrolTasks.filter(t => t.status === '进行中').length}</p>
                        <p class="text-xs text-slate-500">进行中</p>
                    </div>
                </div>
                <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center gap-4">
                    <div class="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                        <i class="fas fa-check-circle text-emerald-500"></i>
                    </div>
                    <div>
                        <p class="text-2xl font-bold text-slate-800">${MockData.patrolTasks.filter(t => t.status === '已完成').length}</p>
                        <p class="text-xs text-slate-500">已完成</p>
                    </div>
                </div>
                <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center gap-4">
                    <div class="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center">
                        <i class="fas fa-clock text-slate-400"></i>
                    </div>
                    <div>
                        <p class="text-2xl font-bold text-slate-800">${MockData.patrolTasks.filter(t => t.status === '待开始').length}</p>
                        <p class="text-xs text-slate-500">待开始</p>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div class="p-4 border-b border-slate-100 flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <button class="px-3 py-1.5 text-sm bg-primary-50 text-primary-600 rounded-lg font-medium">全部</button>
                        <button class="px-3 py-1.5 text-sm text-slate-500 hover:bg-slate-100 rounded-lg">进行中</button>
                        <button class="px-3 py-1.5 text-sm text-slate-500 hover:bg-slate-100 rounded-lg">已完成</button>
                        <button class="px-3 py-1.5 text-sm text-slate-500 hover:bg-slate-100 rounded-lg">待开始</button>
                    </div>
                    <div class="relative">
                        <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                        <input type="text" placeholder="搜索任务..." class="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm w-56 focus:outline-none focus:ring-2 focus:ring-primary-500">
                    </div>
                </div>

                <table class="data-table">
                    <thead>
                        <tr>
                            <th>任务名称</th>
                            <th>巡护员</th>
                            <th>路线</th>
                            <th>里程</th>
                            <th>开始时间</th>
                            <th>结束时间</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${MockData.patrolTasks.map(task => {
                            const statusClass = task.status === '已完成' ? 'status-online' :
                                               task.status === '进行中' ? 'status-pending' : 'status-warning';
                            return `
                                <tr>
                                    <td class="font-medium text-slate-800">${task.taskName}</td>
                                    <td class="text-slate-600">
                                        <div class="flex items-center gap-2">
                                            <div class="w-6 h-6 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xs">
                                                ${task.patroller[0]}
                                            </div>
                                            ${task.patroller}
                                        </div>
                                    </td>
                                    <td class="text-slate-600">${task.route}</td>
                                    <td class="text-slate-600">${task.distance} km</td>
                                    <td class="text-slate-500 text-sm">${task.startDate}</td>
                                    <td class="text-slate-500 text-sm">${task.endDate}</td>
                                    <td>
                                        <span class="status-badge ${statusClass}">
                                            <span class="w-1.5 h-1.5 rounded-full ${
                                                task.status === '已完成' ? 'bg-emerald-500' :
                                                task.status === '进行中' ? 'bg-sky-500' : 'bg-amber-500'
                                            }"></span>
                                            ${task.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div class="flex items-center gap-1">
                                            <button class="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                            <button class="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors">
                                                <i class="fas fa-edit"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        `;
    },

    renderPrevention(container) {
        const severityColors = {
            '一般': 'bg-amber-100 text-amber-600',
            '轻微': 'bg-sky-100 text-sky-600',
            '严重': 'bg-rose-100 text-rose-600'
        };

        container.innerHTML = `
            <div class="mb-6 flex items-center justify-between">
                <div>
                    <h2 class="text-2xl font-serif font-semibold text-slate-800 mb-1">盗猎防控</h2>
                    <p class="text-slate-500 text-sm">盗猎防控记录和案件管理</p>
                </div>
                <div class="flex items-center gap-2">
                    <button class="btn btn-secondary">
                        <i class="fas fa-file-export"></i>
                        导出记录
                    </button>
                    <button class="btn btn-primary">
                        <i class="fas fa-plus"></i>
                        新增记录
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                    <p class="text-sm text-slate-500 mb-1">总记录数</p>
                    <p class="text-2xl font-bold text-slate-800">${MockData.preventionRecords.length}</p>
                </div>
                <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                    <p class="text-sm text-slate-500 mb-1">本月新增</p>
                    <p class="text-2xl font-bold text-slate-800">2</p>
                </div>
                <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                    <p class="text-sm text-slate-500 mb-1">处理中</p>
                    <p class="text-2xl font-bold text-amber-500">${MockData.preventionRecords.filter(r => r.status === '处理中').length}</p>
                </div>
                <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                    <p class="text-sm text-slate-500 mb-1">已处理</p>
                    <p class="text-2xl font-bold text-emerald-500">${MockData.preventionRecords.filter(r => r.status === '已处理').length}</p>
                </div>
            </div>

            <div class="space-y-4">
                ${MockData.preventionRecords.map(record => {
                    const typeIcons = {
                        '巡逻发现': 'fa-hiking',
                        '群众举报': 'fa-phone-volume',
                        '监控发现': 'fa-video'
                    };
                    const typeColors = {
                        '巡逻发现': 'bg-primary-50 text-primary-600',
                        '群众举报': 'bg-accent-50 text-accent-600',
                        '监控发现': 'bg-sky-50 text-sky-600'
                    };
                    
                    return `
                        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-shadow">
                            <div class="flex items-start gap-4">
                                <div class="w-12 h-12 rounded-xl ${typeColors[record.type]} flex items-center justify-center flex-shrink-0">
                                    <i class="fas ${typeIcons[record.type] || 'fa-exclamation-triangle'} text-xl"></i>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <div class="flex items-start justify-between mb-2">
                                        <div>
                                            <h3 class="text-base font-semibold text-slate-800">${record.description}</h3>
                                            <div class="flex items-center gap-3 mt-1">
                                                <span class="text-xs text-slate-500">
                                                    <i class="fas fa-map-marker-alt mr-1"></i>${record.location}
                                                </span>
                                                <span class="text-xs text-slate-500">
                                                    <i class="fas fa-calendar mr-1"></i>${record.date}
                                                </span>
                                                <span class="text-xs text-slate-500">
                                                    <i class="fas fa-user mr-1"></i>${record.handler}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="flex items-center gap-2">
                                            <span class="px-2.5 py-1 ${severityColors[record.severity]} text-xs font-medium rounded-full">
                                                ${record.severity}
                                            </span>
                                            <span class="status-badge ${record.status === '已处理' ? 'status-online' : 'status-warning'}">
                                                <span class="w-1.5 h-1.5 rounded-full ${record.status === '已处理' ? 'bg-emerald-500' : 'bg-amber-500'}"></span>
                                                ${record.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-3 mt-3 pt-3 border-t border-slate-100">
                                        <span class="text-xs text-slate-400">类型: ${record.type}</span>
                                        <button class="text-xs text-primary-600 hover:text-primary-700 font-medium ml-auto">
                                            查看详情 <i class="fas fa-arrow-right ml-1"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }
};
