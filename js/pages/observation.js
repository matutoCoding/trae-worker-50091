// 观测点位模块

const ObservationPage = {
    manageSearch: '',
    manageType: '',

    renderSites(container) {
        var self = this;

        var total = MockData.observationSites.length;
        var online = MockData.observationSites.filter(function(s) { return s.status === 'online'; }).length;
        var warning = MockData.observationSites.filter(function(s) { return s.status === 'warning'; }).length;
        var offline = MockData.observationSites.filter(function(s) { return s.status === 'offline'; }).length;

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
                        <p class="text-2xl font-bold text-slate-800">${total}</p>
                        <p class="text-sm text-slate-500">总站点数</p>
                    </div>
                </div>
                <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center gap-4">
                    <div class="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                        <i class="fas fa-circle text-green-500"></i>
                    </div>
                    <div>
                        <p class="text-2xl font-bold text-slate-800">${online}</p>
                        <p class="text-sm text-slate-500">在线站点</p>
                    </div>
                </div>
                <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center gap-4">
                    <div class="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                        <i class="fas fa-exclamation-triangle text-amber-500"></i>
                    </div>
                    <div>
                        <p class="text-2xl font-bold text-slate-800">${warning}</p>
                        <p class="text-sm text-slate-500">告警站点</p>
                    </div>
                </div>
                <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center gap-4">
                    <div class="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center">
                        <i class="fas fa-power-off text-slate-400"></i>
                    </div>
                    <div>
                        <p class="text-2xl font-bold text-slate-800">${offline}</p>
                        <p class="text-sm text-slate-500">离线站点</p>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div class="p-4 border-b border-slate-100 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div class="relative">
                            <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                            <input type="text" id="siteMapSearch" placeholder="搜索站点..." class="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64">
                        </div>
                        <select id="siteMapType" class="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                            <option value="">全部类型</option>
                            <option value="湖泊湿地">湖泊湿地</option>
                            <option value="滩涂湿地">滩涂湿地</option>
                            <option value="沼泽湿地">沼泽湿地</option>
                            <option value="河流湿地">河流湿地</option>
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

        setTimeout(function() {
            self.bindMapEvents();
        }, 0);
    },

    bindMapEvents: function() {
        var self = this;
        var searchInput = document.getElementById('siteMapSearch');
        var typeSelect = document.getElementById('siteMapType');
        if (!searchInput || !typeSelect) return;

        function updateMap() {
            if (App.maps.observation) {
                App.maps.observation.remove();
                App.maps.observation = null;
            }
            self.initMap(searchInput.value.trim(), typeSelect.value);
        }

        searchInput.addEventListener('input', updateMap);
        typeSelect.addEventListener('change', updateMap);
    },

    initMap: function(filterQuery, filterType) {
        var mapContainer = document.getElementById('observationMap');
        if (!mapContainer) return;

        var map = L.map('observationMap').setView([30.555, 114.375], 13);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        var query = (filterQuery || '').trim().toLowerCase();
        var typeVal = filterType || '';

        var filteredSites = MockData.observationSites.filter(function(site) {
            var matchQuery = !query || site.name.toLowerCase().indexOf(query) !== -1 ||
                             site.location.toLowerCase().indexOf(query) !== -1;
            var matchType = !typeVal || site.type === typeVal;
            return matchQuery && matchType;
        });

        filteredSites.forEach(function(site) {
            var color = '#10b981';
            if (site.status === 'warning') color = '#f59e0b';
            if (site.status === 'offline') color = '#94a3b8';

            var icon = L.divIcon({
                className: 'custom-marker',
                html: '<div style="width: 32px; height: 32px; background: ' + color + '; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">' +
                    '<i class="fas fa-map-marker-alt text-white" style="font-size: 12px;"></i>' +
                '</div>',
                iconSize: [32, 32],
                iconAnchor: [16, 16]
            });

            var marker = L.marker([site.lat, site.lng], { icon: icon }).addTo(map);
            
            var statusClass = site.status === 'online' ? 'status-online' : 
                               site.status === 'warning' ? 'status-warning' : 'status-offline';
            var statusText = site.status === 'online' ? '在线' : 
                              site.status === 'warning' ? '告警' : '离线';

            marker.bindPopup(
                '<div style="min-width: 200px;">' +
                    '<h4 style="font-weight: 600; font-size: 14px; margin-bottom: 8px; color: #334155;">' + site.name + '</h4>' +
                    '<div style="margin-bottom: 6px;">' +
                        '<span class="' + statusClass + '" style="display: inline-block; padding: 2px 8px; border-radius: 9999px; font-size: 11px; font-weight: 500;">' +
                            statusText +
                        '</span>' +
                    '</div>' +
                    '<p style="font-size: 12px; color: #64748b; margin: 4px 0;">' +
                        '<i class="fas fa-map-pin mr-1"></i>' + site.location +
                    '</p>' +
                    '<p style="font-size: 12px; color: #64748b; margin: 4px 0;">' +
                        '<i class="fas fa-tag mr-1"></i>' + site.type +
                    '</p>' +
                    '<p style="font-size: 12px; color: #64748b; margin: 4px 0;">' +
                        '<i class="fas fa-microchip mr-1"></i>' + site.equipment +
                    '</p>' +
                    '<p style="font-size: 11px; color: #94a3b8; margin-top: 8px;">' +
                        '更新时间: ' + site.lastUpdate +
                    '</p>' +
                '</div>'
            );
        });

        App.maps.observation = map;
    },

    renderManage(container) {
        var self = this;
        var pageContainer = container;

        var query = (this.manageSearch || '').trim().toLowerCase();
        var typeVal = this.manageType || '';

        var filteredSites = MockData.observationSites.filter(function(site) {
            var matchQuery = !query || site.name.toLowerCase().indexOf(query) !== -1 ||
                             site.location.toLowerCase().indexOf(query) !== -1;
            var matchType = !typeVal || site.type === typeVal;
            return matchQuery && matchType;
        });

        var total = filteredSites.length;
        var online = filteredSites.filter(function(s) { return s.status === 'online'; }).length;
        var warning = filteredSites.filter(function(s) { return s.status === 'warning'; }).length;
        var offline = filteredSites.filter(function(s) { return s.status === 'offline'; }).length;

        var searchEscaped = this.manageSearch ? this.manageSearch.replace(/"/g, '&quot;') : '';

        container.innerHTML = `
            <div class="mb-6 flex items-center justify-between">
                <div>
                    <h2 class="text-2xl font-serif font-semibold text-slate-800 mb-1">站点管理</h2>
                    <p class="text-slate-500 text-sm">管理所有观测站点信息，共 ${total} 个站点</p>
                </div>
                <button class="btn btn-primary">
                    <i class="fas fa-plus"></i>
                    新增站点
                </button>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
                <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                    <p class="text-sm text-slate-500 mb-1">筛选结果</p>
                    <p class="text-2xl font-bold text-slate-800">${total}</p>
                </div>
                <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                    <p class="text-sm text-emerald-600 mb-1">在线</p>
                    <p class="text-2xl font-bold text-emerald-600">${online}</p>
                </div>
                <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                    <p class="text-sm text-amber-600 mb-1">告警</p>
                    <p class="text-2xl font-bold text-amber-600">${warning}</p>
                </div>
                <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                    <p class="text-sm text-slate-500 mb-1">离线</p>
                    <p class="text-2xl font-bold text-slate-500">${offline}</p>
                </div>
            </div>

            <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div class="p-4 border-b border-slate-100 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div class="relative">
                            <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                            <input type="text" id="manageSiteSearch" placeholder="搜索站点名称或位置..." value="${searchEscaped}" class="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64">
                        </div>
                        <select id="manageSiteType" class="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                            <option value="">全部类型</option>
                            <option value="湖泊湿地" ${typeVal === '湖泊湿地' ? 'selected' : ''}>湖泊湿地</option>
                            <option value="滩涂湿地" ${typeVal === '滩涂湿地' ? 'selected' : ''}>滩涂湿地</option>
                            <option value="沼泽湿地" ${typeVal === '沼泽湿地' ? 'selected' : ''}>沼泽湿地</option>
                            <option value="河流湿地" ${typeVal === '河流湿地' ? 'selected' : ''}>河流湿地</option>
                        </select>
                    </div>
                    <div class="flex items-center gap-2">
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
                        ${filteredSites.length > 0 ? filteredSites.map(function(site) {
                            var statusClass = site.status === 'online' ? 'status-online' : 
                                               site.status === 'warning' ? 'status-warning' : 'status-offline';
                            var statusText = site.status === 'online' ? '在线' : 
                                              site.status === 'warning' ? '告警' : '离线';
                            var dotColor = site.status === 'online' ? 'bg-emerald-500' : site.status === 'warning' ? 'bg-amber-500' : 'bg-slate-400';
                            return `
                                <tr>
                                    <td class="font-mono text-slate-500">${site.id}</td>
                                    <td class="font-medium text-slate-800">${site.name}</td>
                                    <td class="text-slate-600">${site.location}</td>
                                    <td><span class="tag tag-primary">${site.type}</span></td>
                                    <td>
                                        <span class="status-badge ${statusClass}">
                                            <span class="w-1.5 h-1.5 rounded-full ${dotColor}"></span>
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
                        }).join('') : `
                            <tr>
                                <td colspan="8" class="py-16 text-center text-slate-400">
                                    <i class="fas fa-search text-3xl mb-3 block"></i>
                                    没有找到匹配的站点
                                </td>
                            </tr>
                        `}
                    </tbody>
                </table>

                <div class="p-4 border-t border-slate-100 flex items-center justify-between">
                    <p class="text-sm text-slate-500">共 ${total} 条记录</p>
                </div>
            </div>
        `;

        setTimeout(function() {
            self.bindManageEvents(pageContainer);
        }, 0);
    },

    bindManageEvents: function(pageContainer) {
        var self = this;
        var searchInput = document.getElementById('manageSiteSearch');
        var typeSelect = document.getElementById('manageSiteType');
        if (!searchInput || !typeSelect) return;

        // 聚焦并移动光标到末尾
        searchInput.focus();
        var val = searchInput.value;
        searchInput.value = '';
        searchInput.value = val;

        function reRender() {
            self.renderManage(pageContainer);
        }

        searchInput.addEventListener('input', function(e) {
            self.manageSearch = e.target.value;
            reRender();
        });

        typeSelect.addEventListener('change', function(e) {
            self.manageType = e.target.value;
            reRender();
        });
    }
};
