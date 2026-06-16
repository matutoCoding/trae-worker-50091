// 观测点位模块

const ObservationPage = {
    renderSites(container) {
        container.innerHTML = `
            <div class="mb-6">
                <h2 class="text-2xl font-serif font-semibold text-slate-800 mb-1">站点分布</h2>
                <p class="text-slate-500 text-sm">查看所有观测站点的位置和状态</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-4 gap-5 mb-5">
                <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center gap-4">
                    <div class="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                        <i class="fas fa-map-marker-alt text-emerald-500 text-xl"></i>
                    </div>
                    <div>
                        <p class="text-2xl font-bold text-slate-800">${MockData.observationSites.length}</p>
                        <p class="text-sm text-slate-500">总站点数</p>
                    </div>
                </div>
                <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center gap-4">
                    <div class="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                        <i class="fas fa-circle text-green-500"></i>
                    </div>
                    <div>
                        <p class="text-2xl font-bold text-slate-800">${MockData.observationSites.filter(s => s.status === 'online').length}</p>
                        <p class="text-sm text-slate-500">在线站点</p>
                    </div>
                </div>
                <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center gap-4">
                    <div class="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                        <i class="fas fa-exclamation-triangle text-amber-500"></i>
                    </div>
                    <div>
                        <p class="text-2xl font-bold text-slate-800">${MockData.observationSites.filter(s => s.status === 'warning').length}</p>
                        <p class="text-sm text-slate-500">告警站点</p>
                    </div>
                </div>
                <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center gap-4">
                    <div class="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center">
                        <i class="fas fa-power-off text-slate-400"></i>
                    </div>
                    <div>
                        <p class="text-2xl font-bold text-slate-800">${MockData.observationSites.filter(s => s.status === 'offline').length}</p>
                        <p class="text-sm text-slate-500">离线站点</p>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div class="p-4 border-b border-slate-100 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div class="relative">
                            <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                            <input type="text" placeholder="搜索站点..." class="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64">
                        </div>
                        <select class="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                            <option>全部类型</option>
                            <option>湖泊湿地</option>
                            <option>滩涂湿地</option>
                            <option>沼泽湿地</option>
                            <option>河流湿地</option>
                        </select>
                    </div>
                    <div class="flex items-center gap-4 text-sm">
                        <span class="flex items-center gap-1.5">
                            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                            在线
                        </span>
                        <span class="flex items-center gap-1.5">
                            <span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                            告警
                        </span>
                        <span class="flex items-center gap-1.5">
                            <span class="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
                            离线
                        </span>
                    </div>
                </div>
                <div id="observationMap" class="h-[calc(100vh-340px)] min-h-[400px]"></div>
            </div>
        `;

        this.initMap();
    },

    initMap() {
        const mapContainer = document.getElementById('observationMap');
        if (!mapContainer) return;

        const map = L.map('observationMap').setView([30.555, 114.375], 13);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        MockData.observationSites.forEach(site => {
            let color = '#10b981';
            if (site.status === 'warning') color = '#f59e0b';
            if (site.status === 'offline') color = '#94a3b8';

            const icon = L.divIcon({
                className: 'custom-marker',
                html: `<div style="width: 32px; height: 32px; background: ${color}; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
                    <i class="fas fa-map-marker-alt text-white text-sm" style="font-size: 12px;"></i>
                </div>`,
                iconSize: [32, 32],
                iconAnchor: [16, 16]
            });

            const marker = L.marker([site.lat, site.lng], { icon }).addTo(map);
            
            const statusClass = site.status === 'online' ? 'status-online' : 
                               site.status === 'warning' ? 'status-warning' : 'status-offline';
            const statusText = site.status === 'online' ? '在线' : 
                              site.status === 'warning' ? '告警' : '离线';

            marker.bindPopup(`
                <div style="min-width: 200px;">
                    <h4 style="font-weight: 600; font-size: 14px; margin-bottom: 8px; color: #334155;">${site.name}</h4>
                    <div style="margin-bottom: 6px;">
                        <span class="${statusClass}" style="display: inline-block; padding: 2px 8px; border-radius: 9999px; font-size: 11px; font-weight: 500;">
                            ${statusText}
                        </span>
                    </div>
                    <p style="font-size: 12px; color: #64748b; margin: 4px 0;">
                        <i class="fas fa-map-pin mr-1"></i>${site.location}
                    </p>
                    <p style="font-size: 12px; color: #64748b; margin: 4px 0;">
                        <i class="fas fa-tag mr-1"></i>${site.type}
                    </p>
                    <p style="font-size: 12px; color: #64748b; margin: 4px 0;">
                        <i class="fas fa-microchip mr-1"></i>${site.equipment}
                    </p>
                    <p style="font-size: 11px; color: #94a3b8; margin-top: 8px;">
                        更新时间: ${site.lastUpdate}
                    </p>
                </div>
            `);
        });

        App.maps.observation = map;
    },

    renderManage(container) {
        container.innerHTML = `
            <div class="mb-6 flex items-center justify-between">
                <div>
                    <h2 class="text-2xl font-serif font-semibold text-slate-800 mb-1">站点管理</h2>
                    <p class="text-slate-500 text-sm">管理所有观测站点信息</p>
                </div>
                <button class="btn btn-primary">
                    <i class="fas fa-plus"></i>
                    新增站点
                </button>
            </div>

            <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div class="p-4 border-b border-slate-100 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div class="relative">
                            <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                            <input type="text" placeholder="搜索站点名称..." class="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64">
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <button class="px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">
                            <i class="fas fa-filter mr-1"></i>筛选
                        </button>
                        <button class="px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">
                            <i class="fas fa-download mr-1"></i>导出
                        </button>
                    </div>
                </div>

                <table class="data-table">
                    <thead>
                        <tr>
                            <th>站点编号</th>
                            <th>站点名称</th>
                            <th>位置</th>
                            <th>类型</th>
                            <th>状态</th>
                            <th>设备</th>
                            <th>最后更新</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${MockData.observationSites.map(site => {
                            const statusClass = site.status === 'online' ? 'status-online' : 
                                               site.status === 'warning' ? 'status-warning' : 'status-offline';
                            const statusText = site.status === 'online' ? '在线' : 
                                              site.status === 'warning' ? '告警' : '离线';
                            return `
                                <tr>
                                    <td class="font-mono text-slate-500">${site.id}</td>
                                    <td class="font-medium text-slate-800">${site.name}</td>
                                    <td class="text-slate-600">${site.location}</td>
                                    <td><span class="tag tag-primary">${site.type}</span></td>
                                    <td>
                                        <span class="status-badge ${statusClass}">
                                            <span class="w-1.5 h-1.5 rounded-full ${site.status === 'online' ? 'bg-emerald-500' : site.status === 'warning' ? 'bg-amber-500' : 'bg-slate-400'}"></span>
                                            ${statusText}
                                        </span>
                                    </td>
                                    <td class="text-slate-500 text-xs">${site.equipment}</td>
                                    <td class="text-slate-500 text-sm">${site.lastUpdate}</td>
                                    <td>
                                        <div class="flex items-center gap-2">
                                            <button class="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                            <button class="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors">
                                                <i class="fas fa-edit"></i>
                                            </button>
                                            <button class="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                                                <i class="fas fa-trash-alt"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>

                <div class="p-4 border-t border-slate-100 flex items-center justify-between">
                    <p class="text-sm text-slate-500">共 ${MockData.observationSites.length} 条记录</p>
                    <div class="flex items-center gap-1">
                        <button class="px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        <button class="px-3 py-1.5 text-sm bg-primary-50 text-primary-600 rounded-lg font-medium">1</button>
                        <button class="px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">2</button>
                        <button class="px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">3</button>
                        <button class="px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
};
