// 首页仪表盘页面

const DashboardPage = {
    render(container) {
        const data = MockData.overview;
        
        container.innerHTML = `
            <div class="mb-6">
                <h2 class="text-2xl font-serif font-semibold text-slate-800 mb-1">数据概览</h2>
                <p class="text-slate-500 text-sm">实时掌握保护区整体情况</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
                <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 card-hover">
                    <div class="flex items-start justify-between mb-4">
                        <div class="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30">
                            <i class="fas fa-feather text-white text-xl"></i>
                        </div>
                        <span class="px-2.5 py-1 bg-emerald-50 text-emerald-600 text-xs font-medium rounded-full">
                            <i class="fas fa-arrow-up mr-1"></i>12%
                        </span>
                    </div>
                    <h3 class="text-3xl font-bold text-slate-800 mb-1" id="stat-species">${data.totalSpecies}</h3>
                    <p class="text-sm text-slate-500">鸟类物种数</p>
                </div>

                <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 card-hover">
                    <div class="flex items-start justify-between mb-4">
                        <div class="w-12 h-12 bg-gradient-to-br from-sky-400 to-sky-600 rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/30">
                            <i class="fas fa-dove text-white text-xl"></i>
                        </div>
                        <span class="px-2.5 py-1 bg-sky-50 text-sky-600 text-xs font-medium rounded-full">
                            实时
                        </span>
                    </div>
                    <h3 class="text-3xl font-bold text-slate-800 mb-1" id="stat-birds">${data.totalBirds.toLocaleString()}</h3>
                    <p class="text-sm text-slate-500">鸟类种群数量</p>
                </div>

                <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 card-hover">
                    <div class="flex items-start justify-between mb-4">
                        <div class="w-12 h-12 bg-gradient-to-br from-accent-400 to-accent-600 rounded-xl flex items-center justify-center shadow-lg shadow-accent-500/30">
                            <i class="fas fa-map-marker-alt text-white text-xl"></i>
                        </div>
                        <span class="status-badge status-online">
                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            ${MockData.observationSites.filter(s => s.status === 'online').length} 个在线
                        </span>
                    </div>
                    <h3 class="text-3xl font-bold text-slate-800 mb-1" id="stat-sites">${data.observationSites}</h3>
                    <p class="text-sm text-slate-500">观测站点</p>
                </div>

                <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 card-hover">
                    <div class="flex items-start justify-between mb-4">
                        <div class="w-12 h-12 bg-gradient-to-br from-rose-400 to-rose-600 rounded-xl flex items-center justify-center shadow-lg shadow-rose-500/30">
                            <i class="fas fa-heartbeat text-white text-xl"></i>
                        </div>
                        <span class="px-2.5 py-1 bg-rose-50 text-rose-600 text-xs font-medium rounded-full">
                            本月
                        </span>
                    </div>
                    <h3 class="text-3xl font-bold text-slate-800 mb-1" id="stat-rescue">${data.rescueThisMonth}</h3>
                    <p class="text-sm text-slate-500">救助鸟类</p>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
                <div class="lg:col-span-2 bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                    <div class="flex items-center justify-between mb-5">
                        <div>
                            <h3 class="text-lg font-semibold text-slate-800">迁徙节律</h3>
                            <p class="text-xs text-slate-500">全年鸟类迁徙数量变化</p>
                        </div>
                        <div class="flex gap-2">
                            <button class="px-3 py-1.5 text-xs font-medium bg-primary-50 text-primary-600 rounded-lg">全年</button>
                            <button class="px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100 rounded-lg">春季</button>
                            <button class="px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100 rounded-lg">秋季</button>
                        </div>
                    </div>
                    <div class="h-64">
                        <canvas id="migrationChart"></canvas>
                    </div>
                </div>

                <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                    <div class="flex items-center justify-between mb-5">
                        <div>
                            <h3 class="text-lg font-semibold text-slate-800">物种分布</h3>
                            <p class="text-xs text-slate-500">按保护级别统计</p>
                        </div>
                    </div>
                    <div class="h-64 flex items-center justify-center">
                        <canvas id="speciesChart"></canvas>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                    <div class="flex items-center justify-between mb-5">
                        <h3 class="text-lg font-semibold text-slate-800">近期活动</h3>
                        <a href="#species-records" class="text-xs text-primary-600 hover:text-primary-700 font-medium">查看全部</a>
                    </div>
                    <div class="space-y-4">
                        ${MockData.recentActivities.map(activity => `
                            <div class="flex gap-3">
                                <div class="w-10 h-10 rounded-lg bg-${activity.color}-50 flex items-center justify-center flex-shrink-0">
                                    <i class="fas ${activity.icon} text-${activity.color}-500"></i>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p class="text-sm font-medium text-slate-700">${activity.title}</p>
                                    <p class="text-xs text-slate-500 mt-0.5">${activity.description}</p>
                                    <p class="text-xs text-slate-400 mt-1">${activity.time}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                    <div class="flex items-center justify-between mb-5">
                        <h3 class="text-lg font-semibold text-slate-800">巡护任务</h3>
                        <a href="#patrol-tasks" class="text-xs text-primary-600 hover:text-primary-700 font-medium">管理任务</a>
                    </div>
                    <div class="space-y-3">
                        ${MockData.patrolTasks.slice(0, 3).map(task => `
                            <div class="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
                                <div class="flex items-center justify-between mb-2">
                                    <h4 class="text-sm font-medium text-slate-700">${task.taskName}</h4>
                                    <span class="text-xs px-2 py-0.5 rounded-full ${
                                        task.status === '已完成' ? 'bg-emerald-100 text-emerald-600' :
                                        task.status === '进行中' ? 'bg-sky-100 text-sky-600' :
                                        'bg-amber-100 text-amber-600'
                                    }">${task.status}</span>
                                </div>
                                <div class="flex items-center gap-3 text-xs text-slate-500">
                                    <span><i class="fas fa-user mr-1"></i>${task.patroller}</span>
                                    <span><i class="fas fa-route mr-1"></i>${task.distance}km</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                    <div class="flex items-center justify-between mb-5">
                        <h3 class="text-lg font-semibold text-slate-800">水位监测</h3>
                        <a href="#habitat-water" class="text-xs text-primary-600 hover:text-primary-700 font-medium">详情</a>
                    </div>
                    <div class="space-y-4">
                        ${MockData.waterSites.slice(0, 3).map(site => {
                            const percentage = (site.currentLevel / site.warningLevel) * 100;
                            const barColor = percentage > 90 ? 'bg-rose-500' : percentage > 70 ? 'bg-amber-500' : 'bg-primary-500';
                            return `
                                <div>
                                    <div class="flex items-center justify-between mb-1.5">
                                        <span class="text-sm text-slate-600">${site.name}</span>
                                        <span class="text-sm font-medium text-slate-800">${site.currentLevel}m</span>
                                    </div>
                                    <div class="h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div class="h-full ${barColor} rounded-full transition-all duration-1000" style="width: ${percentage}%"></div>
                                    </div>
                                    <p class="text-xs text-slate-400 mt-1">警戒水位: ${site.warningLevel}m</p>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </div>
        `;

        this.initCharts();
    },

    initCharts() {
        // 迁徙节律图表
        const rhythmCtx = document.getElementById('migrationChart');
        if (rhythmCtx) {
            const rhythmData = MockData.migrationRhythm;
            App.charts.migration = new Chart(rhythmCtx, {
                type: 'line',
                data: {
                    labels: rhythmData.map(d => d.month),
                    datasets: [
                        {
                            label: '迁来数量',
                            data: rhythmData.map(d => d.arrival),
                            borderColor: '#14b8a6',
                            backgroundColor: 'rgba(20, 184, 166, 0.1)',
                            fill: true,
                            tension: 0.4,
                            borderWidth: 2,
                            pointRadius: 0,
                            pointHoverRadius: 6,
                            pointHoverBackgroundColor: '#14b8a6',
                            pointHoverBorderColor: '#fff',
                            pointHoverBorderWidth: 2
                        },
                        {
                            label: '迁走数量',
                            data: rhythmData.map(d => d.departure),
                            borderColor: '#f59e0b',
                            backgroundColor: 'rgba(245, 158, 11, 0.1)',
                            fill: true,
                            tension: 0.4,
                            borderWidth: 2,
                            pointRadius: 0,
                            pointHoverRadius: 6,
                            pointHoverBackgroundColor: '#f59e0b',
                            pointHoverBorderColor: '#fff',
                            pointHoverBorderWidth: 2
                        },
                        {
                            label: '停留数量',
                            data: rhythmData.map(d => d.stay),
                            borderColor: '#38bdf8',
                            backgroundColor: 'rgba(56, 189, 248, 0.1)',
                            fill: true,
                            tension: 0.4,
                            borderWidth: 2,
                            pointRadius: 0,
                            pointHoverRadius: 6,
                            pointHoverBackgroundColor: '#38bdf8',
                            pointHoverBorderColor: '#fff',
                            pointHoverBorderWidth: 2
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
                                pointStyle: 'circle',
                                padding: 15,
                                font: {
                                    size: 11
                                }
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
                            grid: {
                                display: false
                            },
                            ticks: {
                                color: '#94a3b8',
                                font: {
                                    size: 11
                                }
                            }
                        },
                        y: {
                            grid: {
                                color: '#f1f5f9'
                            },
                            ticks: {
                                color: '#94a3b8',
                                font: {
                                    size: 11
                                },
                                callback: function(value) {
                                    return value >= 1000 ? (value / 1000) + 'k' : value;
                                }
                            }
                        }
                    }
                }
            });
        }

        // 物种分布图表
        const speciesCtx = document.getElementById('speciesChart');
        if (speciesCtx) {
            App.charts.species = new Chart(speciesCtx, {
                type: 'doughnut',
                data: {
                    labels: ['国家一级', '国家二级', '三有保护', '其他'],
                    datasets: [{
                        data: [12, 38, 156, 80],
                        backgroundColor: [
                            '#f43f5e',
                            '#f59e0b',
                            '#14b8a6',
                            '#94a3b8'
                        ],
                        borderWidth: 0,
                        hoverOffset: 8
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '70%',
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                usePointStyle: true,
                                pointStyle: 'circle',
                                padding: 15,
                                font: {
                                    size: 11
                                }
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            titleColor: '#334155',
                            bodyColor: '#64748b',
                            borderColor: '#e2e8f0',
                            borderWidth: 1,
                            padding: 12,
                            callbacks: {
                                label: function(context) {
                                    return context.label + ': ' + context.raw + ' 种';
                                }
                            }
                        }
                    }
                }
            });
        }
    }
};
