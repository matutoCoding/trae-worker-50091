// 救助登记模块

const RescuePage = {
    renderRecords(container) {
        const statusColors = {
            '治疗中': 'bg-amber-100 text-amber-700',
            '康复中': 'bg-sky-100 text-sky-700',
            '已放归': 'bg-emerald-100 text-emerald-700'
        };

        const injuryColors = {
            '轻度': 'bg-emerald-100 text-emerald-600',
            '中度': 'bg-amber-100 text-amber-600',
            '严重': 'bg-rose-100 text-rose-600'
        };

        container.innerHTML = `
            <div class="mb-6 flex items-center justify-between">
                <div>
                    <h2 class="text-2xl font-serif font-semibold text-slate-800 mb-1">救助记录</h2>
                    <p class="text-slate-500 text-sm">伤病鸟救助登记和管理</p>
                </div>
                <button class="btn btn-primary">
                    <i class="fas fa-plus"></i>
                    新增救助
                </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center gap-4">
                    <div class="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center">
                        <i class="fas fa-heartbeat text-rose-500 text-xl"></i>
                    </div>
                    <div>
                        <p class="text-2xl font-bold text-slate-800">${MockData.rescueRecords.length}</p>
                        <p class="text-sm text-slate-500">总救助数</p>
                    </div>
                </div>
                <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center gap-4">
                    <div class="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                        <i class="fas fa-stethoscope text-amber-500 text-xl"></i>
                    </div>
                    <div>
                        <p class="text-2xl font-bold text-slate-800">${MockData.rescueRecords.filter(r => r.status === '治疗中').length}</p>
                        <p class="text-sm text-slate-500">治疗中</p>
                    </div>
                </div>
                <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center gap-4">
                    <div class="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center">
                        <i class="fas fa-heart text-sky-500 text-xl"></i>
                    </div>
                    <div>
                        <p class="text-2xl font-bold text-slate-800">${MockData.rescueRecords.filter(r => r.status === '康复中').length}</p>
                        <p class="text-sm text-slate-500">康复中</p>
                    </div>
                </div>
                <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center gap-4">
                    <div class="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                        <i class="fas fa-dove text-emerald-500 text-xl"></i>
                    </div>
                    <div>
                        <p class="text-2xl font-bold text-slate-800">${MockData.rescueRecords.filter(r => r.status === '已放归').length}</p>
                        <p class="text-sm text-slate-500">已放归</p>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div class="p-4 border-b border-slate-100 flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <button class="px-3 py-1.5 text-sm bg-primary-50 text-primary-600 rounded-lg font-medium">全部</button>
                        <button class="px-3 py-1.5 text-sm text-slate-500 hover:bg-slate-100 rounded-lg">治疗中</button>
                        <button class="px-3 py-1.5 text-sm text-slate-500 hover:bg-slate-100 rounded-lg">康复中</button>
                        <button class="px-3 py-1.5 text-sm text-slate-500 hover:bg-slate-100 rounded-lg">已放归</button>
                    </div>
                    <div class="relative">
                        <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                        <input type="text" placeholder="搜索物种、地点..." class="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm w-56 focus:outline-none focus:ring-2 focus:ring-primary-500">
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    ${MockData.rescueRecords.map(record => {
                        return `
                            <div class="border border-slate-100 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer">
                                <div class="flex items-start justify-between mb-3">
                                    <div class="flex items-center gap-3">
                                        <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-rose-100 to-amber-100 flex items-center justify-center">
                                            <i class="fas fa-dove text-2xl text-rose-500"></i>
                                        </div>
                                        <div>
                                            <h3 class="font-semibold text-slate-800">${record.speciesName}</h3>
                                            <p class="text-xs text-slate-500">${record.age} · ${record.gender}</p>
                                        </div>
                                    </div>
                                    <span class="px-2.5 py-1 ${statusColors[record.status]} text-xs font-medium rounded-full">
                                        ${record.status}
                                    </span>
                                </div>
                                
                                <div class="space-y-2 mb-4">
                                    <div class="flex items-center gap-2 text-sm text-slate-600">
                                        <i class="fas fa-heartbeat text-rose-400 w-4"></i>
                                        <span class="${injuryColors[record.injuryDegree]} px-2 py-0.5 rounded text-xs font-medium">${record.injuryDegree}</span>
                                        <span class="text-slate-500">${record.injuryType}</span>
                                    </div>
                                    <div class="flex items-center gap-2 text-sm text-slate-600">
                                        <i class="fas fa-map-marker-alt text-primary-400 w-4"></i>
                                        <span>${record.rescueLocation}</span>
                                    </div>
                                    <div class="flex items-center gap-2 text-sm text-slate-600">
                                        <i class="fas fa-calendar text-sky-400 w-4"></i>
                                        <span>${record.rescueDate}</span>
                                    </div>
                                    <div class="flex items-center gap-2 text-sm text-slate-600">
                                        <i class="fas fa-user text-slate-400 w-4"></i>
                                        <span>救助人: ${record.rescuer}</span>
                                    </div>
                                </div>

                                <button class="w-full py-2 bg-slate-50 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-100 transition-colors">
                                    查看详情
                                </button>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    },

    renderTreatment(container) {
        container.innerHTML = `
            <div class="mb-6">
                <h2 class="text-2xl font-serif font-semibold text-slate-800 mb-1">治疗跟踪</h2>
                <p class="text-slate-500 text-sm">记录和跟踪伤病鸟的治疗过程</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div class="lg:col-span-1 space-y-3">
                    <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
                        <div class="relative mb-4">
                            <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                            <input type="text" placeholder="搜索救助记录..." class="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                        </div>
                        <div class="space-y-2 max-h-[500px] overflow-y-auto">
                            ${MockData.rescueRecords.filter(r => r.status !== '已放归').map((record, index) => `
                                <div class="p-3 rounded-xl cursor-pointer transition-colors ${index === 0 ? 'bg-primary-50 border border-primary-200' : 'hover:bg-slate-50'}">
                                    <div class="flex items-center gap-3">
                                        <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-rose-100 to-amber-100 flex items-center justify-center">
                                            <i class="fas fa-dove text-rose-500"></i>
                                        </div>
                                        <div class="flex-1 min-w-0">
                                            <h4 class="text-sm font-medium text-slate-700 truncate">${record.speciesName}</h4>
                                            <p class="text-xs text-slate-500">${record.injuryType} · ${record.status}</p>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-2">
                    <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
                        <div class="flex items-start justify-between mb-6 pb-5 border-b border-slate-100">
                            <div class="flex items-center gap-4">
                                <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-100 to-amber-100 flex items-center justify-center">
                                    <i class="fas fa-dove text-3xl text-rose-500"></i>
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold text-slate-800">东方白鹳</h3>
                                    <p class="text-sm text-slate-500">成鸟 · 雌性 · 国家一级保护</p>
                                    <div class="flex items-center gap-2 mt-2">
                                        <span class="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">中度受伤</span>
                                        <span class="px-2 py-0.5 bg-sky-100 text-sky-700 text-xs font-medium rounded-full">治疗中</span>
                                    </div>
                                </div>
                            </div>
                            <button class="btn btn-secondary">
                                <i class="fas fa-plus"></i>
                                添加治疗记录
                            </button>
                        </div>

                        <div class="mb-4">
                            <h4 class="font-semibold text-slate-700 mb-4">治疗时间线</h4>
                            <div class="relative pl-6 space-y-5">
                                <div class="absolute left-[7px] top-1 bottom-1 w-0.5 bg-gradient-to-b from-primary-300 via-primary-400 to-primary-200"></div>
                                
                                ${MockData.treatmentLogs.filter(l => l.rescueId === 'RR001').map(log => `
                                    <div class="relative">
                                        <div class="absolute -left-[22px] top-1 w-4 h-4 rounded-full bg-white border-2 border-primary-500 flex items-center justify-center">
                                            <span class="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                                        </div>
                                        <div class="bg-slate-50 rounded-xl p-4">
                                            <div class="flex items-center justify-between mb-2">
                                                <span class="text-sm font-medium text-slate-700">${log.treatment}</span>
                                                <span class="text-xs text-slate-400">${log.logDate}</span>
                                            </div>
                                            <p class="text-sm text-slate-600 mb-2">${log.notes}</p>
                                            <span class="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-600 text-xs font-medium rounded-full">
                                                ${log.status}
                                            </span>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    renderRelease(container) {
        container.innerHTML = `
            <div class="mb-6 flex items-center justify-between">
                <div>
                    <h2 class="text-2xl font-serif font-semibold text-slate-800 mb-1">放归登记</h2>
                    <p class="text-slate-500 text-sm">记录康复鸟类的放归信息</p>
                </div>
                <button class="btn btn-primary">
                    <i class="fas fa-plus"></i>
                    登记放归
                </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div class="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-5 text-white">
                    <div class="flex items-center gap-3 mb-3">
                        <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                            <i class="fas fa-dove text-white"></i>
                        </div>
                        <div>
                            <p class="text-white/80 text-sm">总放归数</p>
                            <p class="text-3xl font-bold">${MockData.releaseRecords.length}</p>
                        </div>
                    </div>
                    <p class="text-white/70 text-sm">本年度累计放归</p>
                </div>
                <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                    <p class="text-sm text-slate-500 mb-2">成功率</p>
                    <p class="text-3xl font-bold text-emerald-600">100%</p>
                    <p class="text-xs text-slate-400 mt-2">放归后存活率</p>
                </div>
                <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                    <p class="text-sm text-slate-500 mb-2">平均治疗周期</p>
                    <p class="text-3xl font-bold text-slate-800">12.5<span class="text-lg font-normal text-slate-500 ml-1">天</span></p>
                    <p class="text-xs text-slate-400 mt-2">从救助到放归</p>
                </div>
            </div>

            <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div class="p-4 border-b border-slate-100">
                    <h3 class="font-semibold text-slate-700">放归记录</h3>
                </div>

                <div class="divide-y divide-slate-100">
                    ${MockData.releaseRecords.map(record => `
                        <div class="p-5 hover:bg-slate-50 transition-colors">
                            <div class="flex items-start gap-5">
                                <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center flex-shrink-0">
                                    <i class="fas fa-dove text-3xl text-emerald-500"></i>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <div class="flex items-center justify-between mb-2">
                                        <h4 class="text-lg font-semibold text-slate-800">${record.speciesName}</h4>
                                        <span class="px-3 py-1 bg-emerald-100 text-emerald-600 text-sm font-medium rounded-full">
                                            <i class="fas fa-check-circle mr-1"></i>已放归
                                        </span>
                                    </div>
                                    
                                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                                        <div>
                                            <p class="text-xs text-slate-400 mb-1">放归日期</p>
                                            <p class="text-sm text-slate-700 font-medium">${record.releaseDate}</p>
                                        </div>
                                        <div>
                                            <p class="text-xs text-slate-400 mb-1">放归地点</p>
                                            <p class="text-sm text-slate-700 font-medium">${record.releaseLocation}</p>
                                        </div>
                                        <div>
                                            <p class="text-xs text-slate-400 mb-1">健康评估</p>
                                            <p class="text-sm text-slate-700 font-medium">${record.healthAssessment}</p>
                                        </div>
                                        <div>
                                            <p class="text-xs text-slate-400 mb-1">放归人</p>
                                            <p class="text-sm text-slate-700 font-medium">${record.releaser}</p>
                                        </div>
                                    </div>
                                    
                                    <p class="text-sm text-slate-500 bg-emerald-50 p-3 rounded-lg">
                                        <i class="fas fa-quote-left text-emerald-300 mr-2"></i>
                                        ${record.notes}
                                    </p>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
};
