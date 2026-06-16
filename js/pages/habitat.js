// 栖息地模块

const HabitatPage = {
    renderWater(container) {
        container.innerHTML = `
            <div class="mb-6">
                <h2 class="text-2xl font-serif font-semibold text-slate-800 mb-1">湿地水位管理</h2>
                <p class="text-slate-500 text-sm">实时监测湿地水位变化</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                ${MockData.waterSites.map(site => {
                    const percentage = (site.currentLevel / site.warningLevel) * 100;
                    const statusColor = site.status === '正常' ? 'emerald' : 'amber';
                    return `
                        <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                            <div class="flex items-center justify-between mb-3">
                                <h3 class="text-sm font-medium text-slate-600">${site.name}</h3>
                                <span class="status-badge status-online">
                                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                    ${site.status}
                                </span>
                            </div>
                            <div class="flex items-end gap-2 mb-3">
                                <span class="text-3xl font-bold text-slate-800">${site.currentLevel}</span>
                                <span class="text-sm text-slate-500 mb-1">米</span>
                            </div>
                            <div class="h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
                                <div class="h-full bg-gradient-to-r from-sky-400 to-sky-600 rounded-full transition-all duration-1000" style="width: ${percentage}%"></div>
                            </div>
                            <p class="text-xs text-slate-400">警戒水位: ${site.warningLevel}m · 危险水位: ${site.criticalLevel}m</p>
                        </div>
                    `;
                }).join('')}
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div class="lg:col-span-2 bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                    <div class="flex items-center justify-between mb-5">
                        <div>
                            <h3 class="text-lg font-semibold text-slate-800">水位变化趋势</h3>
                            <p class="text-xs text-slate-500">近7天水位监测数据</p>
                        </div>
                        <div class="flex gap-2">
                            <button class="px-3 py-1.5 text-xs font-medium bg-primary-50 text-primary-600 rounded-lg">7天</button>
                            <button class="px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100 rounded-lg">30天</button>
                            <button class="px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100 rounded-lg">90天</button>
                        </div>
                    </div>
                    <div class="h-72">
                        <canvas id="waterLevelChart"></canvas>
                    </div>
                </div>

                <div class="space-y-4">
                    <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                        <h3 class="font-semibold text-slate-800 mb-4">预警设置</h3>
                        <div class="space-y-4">
                            <div>
                                <div class="flex items-center justify-between mb-2">
                                    <span class="text-sm text-slate-600">水位预警通知</span>
                                    <label class="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" checked class="sr-only peer">
                                        <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label class="text-sm text-slate-600 mb-2 block">预警阈值</label>
                                <select class="form-input">
                                    <option>警戒水位 (80%)</option>
                                    <option>危险水位 (90%)</option>
                                    <option>自定义</option>
                                </select>
                            </div>
                            <div>
                                <label class="text-sm text-slate-600 mb-2 block">通知方式</label>
                                <div class="flex gap-2">
                                    <button class="flex-1 py-2 px-3 bg-primary-50 text-primary-600 rounded-lg text-sm font-medium">
                                        <i class="fas fa-bell mr-1"></i>系统
                                    </button>
                                    <button class="flex-1 py-2 px-3 bg-slate-50 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-100">
                                        <i class="fas fa-envelope mr-1"></i>邮件
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                        <h3 class="font-semibold text-slate-800 mb-4">水位调节</h3>
                        <div class="space-y-3">
                            <button class="w-full py-3 bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-sky-500/30 transition-all">
                                <i class="fas fa-tint mr-2"></i>开闸放水
                            </button>
                            <button class="w-full py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-all">
                                <i class="fas fa-water mr-2"></i>关闸蓄水
                            </button>
                            <p class="text-xs text-slate-400 text-center">需管理员权限操作</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.initWaterChart();
    },

    initWaterChart() {
        const ctx = document.getElementById('waterLevelChart');
        if (!ctx) return;

        const data = MockData.waterLevelHistory;
        App.charts.waterLevel = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(d => d.date),
                datasets: [
                    {
                        label: '东湖',
                        data: data.map(d => d.eastLake),
                        borderColor: '#0ea5e9',
                        backgroundColor: 'rgba(14, 165, 233, 0.1)',
                        fill: true,
                        tension: 0.4,
                        borderWidth: 3,
                        pointRadius: 4,
                        pointBackgroundColor: '#0ea5e9',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2
                    },
                    {
                        label: '西湖',
                        data: data.map(d => d.westLake),
                        borderColor: '#14b8a6',
                        backgroundColor: 'rgba(20, 184, 166, 0.1)',
                        fill: true,
                        tension: 0.4,
                        borderWidth: 3,
                        pointRadius: 4,
                        pointBackgroundColor: '#14b8a6',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2
                    },
                    {
                        label: '南滩',
                        data: data.map(d => d.southBeach),
                        borderColor: '#f59e0b',
                        backgroundColor: 'rgba(245, 158, 11, 0.1)',
                        fill: true,
                        tension: 0.4,
                        borderWidth: 3,
                        pointRadius: 4,
                        pointBackgroundColor: '#f59e0b',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2
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
                            padding: 20,
                            font: {
                                size: 12
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
                                return context.dataset.label + ': ' + context.raw + ' m';
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
                                return value + 'm';
                            }
                        }
                    }
                }
            }
        });
    },

    renderRestoration(container) {
        container.innerHTML = `
            <div class="mb-6 flex items-center justify-between">
                <div>
                    <h2 class="text-2xl font-serif font-semibold text-slate-800 mb-1">栖息地修复项目</h2>
                    <p class="text-slate-500 text-sm">管理和跟踪栖息地修复工程</p>
                </div>
                <button class="btn btn-primary">
                    <i class="fas fa-plus"></i>
                    新建项目
                </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center gap-4">
                    <div class="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                        <i class="fas fa-seedling text-emerald-500 text-xl"></i>
                    </div>
                    <div>
                        <p class="text-2xl font-bold text-slate-800">${MockData.restorationProjects.length}</p>
                        <p class="text-sm text-slate-500">总项目数</p>
                    </div>
                </div>
                <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center gap-4">
                    <div class="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center">
                        <i class="fas fa-spinner text-sky-500 text-xl"></i>
                    </div>
                    <div>
                        <p class="text-2xl font-bold text-slate-800">${MockData.restorationProjects.filter(p => p.status === '进行中').length}</p>
                        <p class="text-sm text-slate-500">进行中</p>
                    </div>
                </div>
                <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center gap-4">
                    <div class="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                        <i class="fas fa-tree text-primary-500 text-xl"></i>
                    </div>
                    <div>
                        <p class="text-2xl font-bold text-slate-800">${MockData.restorationProjects.reduce((sum, p) => sum + p.area, 0)}</p>
                        <p class="text-sm text-slate-500">修复面积(公顷)</p>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                ${MockData.restorationProjects.map(project => {
                    const statusColor = project.status === '已完成' ? 'emerald' : 'primary';
                    const progressColor = project.progress >= 80 ? 'bg-emerald-500' : 
                                        project.progress >= 50 ? 'bg-primary-500' : 'bg-amber-500';
                    return `
                        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden card-hover">
                            <div class="h-32 bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 relative">
                                <div class="absolute inset-0 opacity-20">
                                    <i class="fas fa-tree absolute top-4 left-6 text-4xl text-white"></i>
                                    <i class="fas fa-leaf absolute top-8 right-8 text-3xl text-white"></i>
                                    <i class="fas fa-seedling absolute bottom-4 left-1/3 text-2xl text-white"></i>
                                </div>
                                <div class="absolute top-4 right-4">
                                    <span class="px-3 py-1 bg-white/90 text-${statusColor}-600 text-xs font-medium rounded-full backdrop-blur-sm">
                                        ${project.status}
                                    </span>
                                </div>
                                <div class="absolute bottom-4 left-5">
                                    <h3 class="text-lg font-bold text-white">${project.name}</h3>
                                </div>
                            </div>
                            <div class="p-5">
                                <p class="text-sm text-slate-600 mb-4 line-clamp-2">${project.description}</p>
                                
                                <div class="grid grid-cols-3 gap-3 mb-4">
                                    <div class="text-center p-2 bg-slate-50 rounded-lg">
                                        <p class="text-lg font-bold text-slate-800">${project.area}</p>
                                        <p class="text-xs text-slate-500">面积(公顷)</p>
                                    </div>
                                    <div class="text-center p-2 bg-slate-50 rounded-lg">
                                        <p class="text-lg font-bold text-slate-800">${project.progress}%</p>
                                        <p class="text-xs text-slate-500">进度</p>
                                    </div>
                                    <div class="text-center p-2 bg-slate-50 rounded-lg">
                                        <p class="text-sm font-bold text-slate-800">${project.manager}</p>
                                        <p class="text-xs text-slate-500">负责人</p>
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <div class="flex items-center justify-between mb-1.5">
                                        <span class="text-xs text-slate-500">项目进度</span>
                                        <span class="text-xs font-medium text-slate-700">${project.progress}%</span>
                                    </div>
                                    <div class="h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div class="h-full ${progressColor} rounded-full transition-all duration-1000" style="width: ${project.progress}%"></div>
                                    </div>
                                </div>

                                <div class="flex items-center justify-between pt-3 border-t border-slate-100">
                                    <span class="text-xs text-slate-400">${project.startDate} - ${project.endDate}</span>
                                    <button class="text-xs text-primary-600 hover:text-primary-700 font-medium">
                                        查看详情 <i class="fas fa-arrow-right ml-1"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }
};
