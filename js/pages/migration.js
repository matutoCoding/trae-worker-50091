// 迁徙监测模块

const MigrationPage = {
    selectedRouteId: 'MR001',

    renderRhythm: function(container) {
        var rankList = [
            { name: '鸿雁', count: 1289, percent: 85 },
            { name: '豆雁', count: 3456, percent: 95 },
            { name: '小天鹅', count: 234, percent: 60 },
            { name: '灰鹤', count: 167, percent: 45 },
            { name: '白琵鹭', count: 156, percent: 40 },
            { name: '东方白鹳', count: 78, percent: 25 }
        ];

        var rankHtml = rankList.map(function(bird, index) {
            return '<div>' +
                '<div class="flex items-center justify-between mb-1.5">' +
                    '<div class="flex items-center gap-2">' +
                        '<span class="w-5 h-5 rounded-full bg-gradient-to-br from-primary-100 text-primary-600 flex items-center justify-center text-xs font-bold">' + (index + 1) + '</span>' +
                        '<span class="text-sm text-slate-700 font-medium">' + bird.name + '</span>' +
                    '</div>' +
                    '<span class="text-sm font-semibold text-slate-800">' + bird.count.toLocaleString() + '只</span>' +
                '</div>' +
                '<div class="h-2 bg-slate-100 rounded-full overflow-hidden">' +
                    '<div class="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full" style="width: ' + bird.percent + '%"></div>' +
                '</div>' +
            '</div>';
        }).join('');

        var timelineList = [
            { month: '2月', event: '越冬期', desc: '越冬水鸟数量达到峰值，各种雁鸭类最多', status: 'active' },
            { month: '3月', event: '春季迁徙开始', desc: '雁鸭类开始北迁，鹤类陆续到达', status: 'past' },
            { month: '4月', event: '迁徙高峰', desc: '北迁候鸟数量最多的月份', status: 'past' },
            { month: '5-6月', event: '繁殖期', desc: '留鸟进入繁殖季节', status: 'past' },
            { month: '7-8月', event: '育雏期', desc: '幼鸟学习飞行和觅食', status: 'past' },
            { month: '9月', event: '秋季迁徙开始', desc: '第一批南迁候鸟开始到达', status: 'past' },
            { month: '10-11月', event: '秋季迁徙高峰', desc: '南迁候鸟数量峰值', status: 'past' },
            { month: '12月', event: '越冬期开始', desc: '越冬水鸟稳定越冬', status: 'past' }
        ];

        var timelineHtml = timelineList.map(function(item) {
            var borderColor = item.status === 'active' ? 'border-primary-500' : 'border-slate-300';
            var dotColor = item.status === 'active' ? 'bg-primary-500' : 'bg-slate-300';
            return '<div class="relative pl-10">' +
                '<div class="absolute left-2 top-1 w-5 h-5 rounded-full bg-white border-2 ' + borderColor + ' flex items-center justify-center">' +
                    '<span class="w-2 h-2 rounded-full ' + dotColor + '"></span>' +
                '</div>' +
                '<div class="py-1">' +
                    '<h4 class="text-base font-semibold text-slate-800">' + item.month + ' · ' + item.event + '</h4>' +
                    '<p class="text-sm text-slate-500 mt-1">' + item.desc + '</p>' +
                '</div>' +
            '</div>';
        }).join('');

        container.innerHTML = `
            <div class="mb-6">
                <h2 class="text-2xl font-serif font-semibold text-slate-800 mb-1">迁徙节律分析</h2>
                <p class="text-slate-500 text-sm">分析鸟类迁徙的时间规律和数量变化</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-4 gap-5 mb-6">
                <div class="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-5 text-white">
                    <p class="text-white/80 text-sm mb-2">春季迁徙高峰</p>
                    <p class="text-3xl font-bold mb-1">3-4月</p>
                    <p class="text-white/70 text-sm">北迁高峰期</p>
                </div>
                <div class="bg-gradient-to-br from-accent-400 to-accent-600 rounded-2xl p-5 text-white">
                    <p class="text-white/80 text-sm mb-2">秋季迁徙高峰</p>
                    <p class="text-3xl font-bold mb-1">10-11月</p>
                    <p class="text-white/70 text-sm">南迁高峰期</p>
                </div>
                <div class="bg-gradient-to-br from-sky-500 to-sky-700 rounded-2xl p-5 text-white">
                    <p class="text-white/80 text-sm mb-2">越冬种群</p>
                    <p class="text-3xl font-bold mb-1">约1.5万只</p>
                    <p class="text-white/70 text-sm">峰值数量</p>
                </div>
                <div class="bg-gradient-to-br from-rose-500 to-rose-700 rounded-2xl p-5 text-white">
                    <p class="text-white/80 text-sm mb-2">繁殖种群</p>
                    <p class="text-3xl font-bold mb-1">约3000只</p>
                    <p class="text-white/70 text-sm">夏季留鸟</p>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
                <div class="lg:col-span-2 bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                    <div class="flex items-center justify-between mb-5">
                        <div>
                            <h3 class="text-lg font-semibold text-slate-800">全年迁徙数量变化</h3>
                            <p class="text-xs text-slate-500">迁来、迁走和停留数量对比</p>
                        </div>
                        <select class="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm">
                            <option>2024年</option>
                            <option>2023年</option>
                            <option>2022年</option>
                        </select>
                    </div>
                    <div class="h-72">
                        <canvas id="rhythmChart"></canvas>
                    </div>
                </div>

                <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                    <h3 class="text-lg font-semibold text-slate-800 mb-4">迁徙物种排行</h3>
                    <div class="space-y-4">
                        ` + rankHtml + `
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                <h3 class="text-lg font-semibold text-slate-800 mb-4">迁徙时间轴</h3>
                <div class="relative">
                    <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-200 via-primary-400 to-primary-200"></div>
                    <div class="space-y-6">
                        ` + timelineHtml + `
                    </div>
                </div>
            </div>
        `;

        this.initRhythmChart();
    },

    initRhythmChart: function() {
        var ctx = document.getElementById('rhythmChart');
        if (!ctx) return;

        var data = MockData.migrationRhythm;
        App.charts.rhythm = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(function(d) { return d.month; }),
                datasets: [
                    {
                        label: '迁来数量',
                        data: data.map(function(d) { return d.arrival; }),
                        backgroundColor: 'rgba(20, 184, 166, 0.8)',
                        borderRadius: 6,
                        barPercentage: 0.6,
                        categoryPercentage: 0.8
                    },
                    {
                        label: '迁走数量',
                        data: data.map(function(d) { return d.departure; }),
                        backgroundColor: 'rgba(245, 158, 11, 0.8)',
                        borderRadius: 6,
                        barPercentage: 0.6,
                        categoryPercentage: 0.8
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                plugins: {
                    legend: {
                        position: 'top',
                        align: 'end',
                        labels: {
                            usePointStyle: true,
                            pointStyle: 'rect',
                            padding: 20,
                            font: { size: 12 }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        titleColor: '#334155',
                        bodyColor: '#64748b',
                        borderColor: '#e2e8f0',
                        borderWidth: 1,
                        padding: 12,
                        boxPadding: 6,
                        usePointStyle: true,
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.raw.toLocaleString() + ' 只';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: {
                            color: '#94a3b8',
                            font: { size: 11 }
                        }
                    },
                    y: {
                        grid: { color: '#f1f5f9' },
                        ticks: {
                            color: '#94a3b8',
                            font: { size: 11 },
                            callback: function(value) {
                                return value >= 1000 ? (value / 1000) + 'k' : value;
                            }
                        }
                    }
                }
            }
        });
    },

    renderRoutes: function(container) {
        var self = this;
        var pageContainer = container;

        // 根据selectedRouteId查找路线
        var selectedRoute = MockData.migrationRoutes.find(function(r) { return r.id === self.selectedRouteId; });
        if (!selectedRoute) {
            selectedRoute = MockData.migrationRoutes[0];
            self.selectedRouteId = selectedRoute.id;
        }

        var optionsHtml = MockData.migrationRoutes.map(function(route) {
            var selected = route.id === self.selectedRouteId ? 'selected' : '';
            return '<option value="' + route.id + '" ' + selected + '>' + route.speciesName + ' - ' + route.season + '</option>';
        }).join('');

        var stopsHtml = selectedRoute.stops.map(function(stop, index) {
            var isLast = index === selectedRoute.stops.length - 1;
            var borderClass = !isLast ? 'border-l-2 border-primary-200' : '';
            var stayStr = stop.stayDays > 0 ? '· 停留' + stop.stayDays + '天' : '';
            return '<div class="relative pl-8 pb-4 ' + borderClass + ' ml-1">' +
                '<div class="absolute left-0 top-0 w-4 h-4 -translate-x-1/2 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 border-2 border-white shadow-sm"></div>' +
                '<div>' +
                    '<p class="text-sm font-medium text-slate-700">' + stop.site + '</p>' +
                    '<p class="text-xs text-slate-500 mt-0.5">' +
                        stop.date + ' ' + stayStr +
                    '</p>' +
                '</div>' +
            '</div>';
        }).join('');

        container.innerHTML = `
            <div class="mb-6 flex items-center justify-between">
                <div>
                    <h2 class="text-2xl font-serif font-semibold text-slate-800 mb-1">迁徙路线追踪</h2>
                    <p class="text-slate-500 text-sm">追踪鸟类迁徙的路线和中途停歇点</p>
                </div>
                <div class="flex items-center gap-3">
                    <select id="routeSelect" class="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500">
                        ` + optionsHtml + `
                    </select>
                    <button class="btn btn-secondary">
                        <i class="fas fa-play"></i>
                        播放动画
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-4 gap-5">
                <div class="lg:col-span-3">
                    <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div id="migrationMap" class="h-[500px]"></div>
                    </div>
                </div>

                <div class="space-y-4">
                    <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                        <h3 class="font-semibold text-slate-800 mb-4">迁徙信息</h3>
                        <div class="space-y-3">
                            <div class="flex justify-between items-center">
                                <span class="text-sm text-slate-500">物种</span>
                                <span class="text-sm font-medium text-slate-700">` + selectedRoute.speciesName + `</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-sm text-slate-500">季节</span>
                                <span class="tag tag-primary">` + selectedRoute.season + `</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-sm text-slate-500">方向</span>
                                <span class="text-sm font-medium text-slate-700">` + selectedRoute.direction + `</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-sm text-slate-500">停歇点数量</span>
                                <span class="text-sm font-medium text-slate-700">` + selectedRoute.stops.length + ` 个</span>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                        <h3 class="font-semibold text-slate-800 mb-4">途经站点</h3>
                        <div class="space-y-3">
                            ` + stopsHtml + `
                        </div>
                    </div>
                </div>
            </div>
        `;

        self.initMigrationMap(selectedRoute.id);

        setTimeout(function() {
            self.bindRouteEvents(pageContainer);
        }, 0);
    },

    bindRouteEvents: function(pageContainer) {
        var self = this;
        var routeSelect = document.getElementById('routeSelect');
        if (routeSelect) {
            routeSelect.addEventListener('change', function(e) {
                self.selectedRouteId = e.target.value;
                self.renderRoutes(pageContainer);
            });
        }
    },

    initMigrationMap: function(routeId) {
        var mapContainer = document.getElementById('migrationMap');
        if (!mapContainer) return;

        // 根据routeId查找路线
        var route = MockData.migrationRoutes.find(function(r) { return r.id === routeId; });
        if (!route) {
            route = MockData.migrationRoutes[0];
        }
        
        var map = L.map('migrationMap').setView([40, 118], 5);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        var latlngs = route.stops.map(function(stop) { return [stop.lat, stop.lng]; });

        L.polyline(latlngs, {
            color: '#0d9488',
            weight: 3,
            opacity: 0.8,
            dashArray: '10, 8',
            lineJoin: 'round',
            lineCap: 'round'
        }).addTo(map);

        route.stops.forEach(function(stop, index) {
            var isFirst = index === 0;
            var isLast = index === route.stops.length - 1;
            var size = isFirst || isLast ? 28 : 20;
            var bgColor = isFirst ? '#10b981' : isLast ? '#f43f5e' : '#0d9488';
            var innerContent = isFirst ? '<i class="fas fa-play" style="font-size: 10px;"></i>' :
                               isLast ? '<i class="fas fa-flag-checkered" style="font-size: 10px;"></i>' :
                               (index + 1);

            var stayDaysHtml = stop.stayDays > 0 ?
                '<p style="font-size: 11px; color: #64748b; margin: 3px 0;">' +
                    '<i class="fas fa-clock mr-1"></i>停留 ' + stop.stayDays + ' 天' +
                '</p>' : '';

            var icon = L.divIcon({
                className: 'stop-marker',
                html: '<div style="position: relative;">' +
                    '<div style="width: ' + size + 'px; height: ' + size + 'px; background: ' + bgColor + '; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; font-size: 10px; color: white; font-weight: bold;">' +
                        innerContent +
                    '</div>' +
                    '<div style="position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%); white-space: nowrap; background: white; padding: 2px 8px; border-radius: 4px; font-size: 11px; color: #334155; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">' +
                        stop.site +
                    '</div>' +
                '</div>',
                iconSize: [80, 50],
                iconAnchor: [40, 14]
            });

            L.marker([stop.lat, stop.lng], { icon: icon }).addTo(map)
                .bindPopup(
                    '<div style="min-width: 150px;">' +
                        '<h4 style="font-weight: 600; font-size: 13px; margin-bottom: 6px; color: #334155;">' + stop.site + '</h4>' +
                        '<p style="font-size: 11px; color: #64748b; margin: 3px 0;">' +
                            '<i class="fas fa-calendar mr-1"></i>' + stop.date +
                        '</p>' +
                        stayDaysHtml +
                    '</div>'
                );
        });

        map.fitBounds(L.latLngBounds(latlngs), { padding: [50, 50] });

        App.maps.migration = map;
    }
};
