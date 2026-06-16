// 物种记录模块

const SpeciesPage = {
    selectedCategory: 'all',
    searchQuery: '',

    renderDirectory(container) {
        var self = this;
        var categories = ['all', '鹤形目', '鹳形目', '雁形目', '鹈形目', '鸻形目'];
        var categoryNames = { 'all': '全部', '鹤形目': '鹤形目', '鹳形目': '鹳形目', '雁形目': '雁形目', '鹈形目': '鹈形目', '鸻形目': '鸻形目' };

        var filteredSpecies = MockData.species.slice();

        // 分类筛选
        if (this.selectedCategory !== 'all') {
            filteredSpecies = filteredSpecies.filter(function(s) {
                return s.category === self.selectedCategory;
            });
        }

        // 搜索筛选
        var query = (this.searchQuery || '').trim().toLowerCase();
        if (query) {
            filteredSpecies = filteredSpecies.filter(function(s) {
                return s.name.toLowerCase().indexOf(query) !== -1 ||
                       s.latinName.toLowerCase().indexOf(query) !== -1;
            });
        }

        var searchEscaped = this.searchQuery ? this.searchQuery.replace(/"/g, '&quot;') : '';

        container.innerHTML = `
            <div class="mb-6">
                <h2 class="text-2xl font-serif font-semibold text-slate-800 mb-1">物种名录</h2>
                <p class="text-slate-500 text-sm">保护区记录的鸟类物种信息，共 ` + filteredSpecies.length + ` 种</p>
            </div>

            <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 mb-6">
                <div class="flex flex-wrap items-center gap-4">
                    <div class="relative flex-1 max-w-md">
                        <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                        <input type="text" id="speciesSearch" placeholder="搜索鸟类名称、学名..." value="` + searchEscaped + `" class="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    </div>
                    <div class="flex flex-wrap gap-2">
                        ` + categories.map(function(cat) {
                            var active = self.selectedCategory === cat;
                            return `<button class="category-btn px-4 py-2 rounded-xl text-sm font-medium transition-all ` + (active ? 'bg-primary-500 text-white shadow-md shadow-primary-500/30' : 'bg-slate-50 text-slate-600 hover:bg-slate-100') + `" data-category="` + cat + `">
                                ` + categoryNames[cat] + `
                            </button>`;
                        }).join('') + `
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                ` + (filteredSpecies.length > 0 ? filteredSpecies.map(function(species) {
                    var protectionClass = protectionLevelColors[species.protectionLevel] || 'bg-slate-100 text-slate-600';
                    var statusMap = {
                        '濒危': 'bg-rose-100 text-rose-600',
                        '易危': 'bg-amber-100 text-amber-600',
                        '无危': 'bg-emerald-100 text-emerald-600'
                    };
                    var statusClass = statusMap[species.status] || 'bg-slate-100 text-slate-600';

                    return `
                        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden card-hover cursor-pointer species-card" data-species-id="` + species.id + `">
                            <div class="h-40 bg-gradient-to-br from-sky-100 via-emerald-50 to-teal-100 relative overflow-hidden">
                                <div class="absolute inset-0 flex items-center justify-center">
                                    <i class="fas fa-dove text-6xl text-white/40"></i>
                                </div>
                                <div class="absolute top-3 right-3 flex gap-1.5">
                                    <span class="px-2 py-0.5 ` + protectionClass + ` text-xs font-medium rounded-full">` + species.protectionLevel + `</span>
                                </div>
                                <div class="absolute bottom-3 left-3">
                                    <span class="px-2 py-0.5 ` + statusClass + ` text-xs font-medium rounded-full">` + species.status + `</span>
                                </div>
                            </div>
                            <div class="p-4">
                                <h3 class="text-base font-semibold text-slate-800 mb-1">` + species.name + `</h3>
                                <p class="text-xs text-slate-400 italic mb-3">` + species.latinName + `</p>
                                <p class="text-sm text-slate-500 line-clamp-2 mb-3">` + species.description + `</p>
                                <div class="flex items-center justify-between pt-3 border-t border-slate-100">
                                    <span class="text-xs text-slate-400">` + species.category + `</span>
                                    <span class="text-sm font-medium text-primary-600">
                                        <i class="fas fa-users mr-1"></i>` + species.population + `只
                                    </span>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('') : `
                    <div class="col-span-full py-16 text-center">
                        <i class="fas fa-search text-5xl text-slate-200 mb-4"></i>
                        <p class="text-slate-500">没有找到匹配的物种</p>
                        <p class="text-sm text-slate-400 mt-1">请尝试其他关键词或分类</p>
                    </div>
                `) + `
            </div>
        `;

        this.bindDirectoryEvents();
    },

    bindDirectoryEvents: function() {
        var self = this;
        var pageContainer = document.getElementById('page-content');

        var categoryBtns = document.querySelectorAll('.category-btn');
        for (var i = 0; i < categoryBtns.length; i++) {
            (function(btn) {
                btn.addEventListener('click', function() {
                    self.selectedCategory = btn.getAttribute('data-category');
                    self.renderDirectory(pageContainer);
                });
            })(categoryBtns[i]);
        }

        var searchInput = document.getElementById('speciesSearch');
        if (searchInput) {
            searchInput.focus();
            // 将光标移到末尾
            var val = searchInput.value;
            searchInput.value = '';
            searchInput.value = val;

            searchInput.addEventListener('input', function(e) {
                self.searchQuery = e.target.value;
                self.renderDirectory(pageContainer);
            });
        }
    },

    renderRecords(container) {
        container.innerHTML = `
            <div class="mb-6 flex items-center justify-between">
                <div>
                    <h2 class="text-2xl font-serif font-semibold text-slate-800 mb-1">观测记录</h2>
                    <p class="text-slate-500 text-sm">鸟类观测记录时间线</p>
                </div>
                <button class="btn btn-primary">
                    <i class="fas fa-plus"></i>
                    新增记录
                </button>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-4 gap-5">
                <div class="lg:col-span-1">
                    <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sticky top-20">
                        <h3 class="font-semibold text-slate-700 mb-4">筛选条件</h3>
                        
                        <div class="space-y-4">
                            <div>
                                <label class="text-sm text-slate-600 mb-2 block">观测站点</label>
                                <select class="form-input">
                                    <option>全部站点</option>
                                    ${MockData.observationSites.map(site => `
                                        <option value="${site.id}">${site.name}</option>
                                    `).join('')}
                                </select>
                            </div>
                            
                            <div>
                                <label class="text-sm text-slate-600 mb-2 block">时间范围</label>
                                <select class="form-input">
                                    <option>全部时间</option>
                                    <option>今天</option>
                                    <option>本周</option>
                                    <option>本月</option>
                                    <option>本季度</option>
                                </select>
                            </div>
                            
                            <div>
                                <label class="text-sm text-slate-600 mb-2 block">物种类别</label>
                                <select class="form-input">
                                    <option>全部物种</option>
                                    <option>国家一级</option>
                                    <option>国家二级</option>
                                    <option>三有保护</option>
                                </select>
                            </div>
                        </div>
                        
                        <button class="w-full mt-5 px-4 py-2.5 bg-primary-50 text-primary-600 rounded-xl text-sm font-medium hover:bg-primary-100 transition-colors">
                            <i class="fas fa-filter mr-1"></i>应用筛选
                        </button>
                    </div>
                </div>

                <div class="lg:col-span-3">
                    <div class="space-y-4">
                        ${MockData.speciesRecords.map(record => {
                            const species = MockData.species.find(s => s.id === record.speciesId);
                            const protectionClass = species ? protectionLevelColors[species.protectionLevel] : 'bg-slate-100 text-slate-600';
                            
                            return `
                                <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-shadow">
                                    <div class="flex items-start gap-4">
                                        <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-sky-100 to-emerald-100 flex items-center justify-center flex-shrink-0">
                                            <i class="fas fa-dove text-2xl text-primary-500"></i>
                                        </div>
                                        <div class="flex-1 min-w-0">
                                            <div class="flex items-start justify-between mb-2">
                                                <div>
                                                    <h3 class="text-lg font-semibold text-slate-800">${record.speciesName}</h3>
                                                    <div class="flex items-center gap-2 mt-1">
                                                        <span class="px-2 py-0.5 ${protectionClass} text-xs font-medium rounded-full">${species?.protectionLevel || ''}</span>
                                                        <span class="text-sm text-slate-500">
                                                            <i class="fas fa-map-marker-alt mr-1"></i>${record.siteName}
                                                        </span>
                                                    </div>
                                                </div>
                                                <span class="text-2xl font-bold text-primary-600">${record.count}<span class="text-sm font-normal text-slate-500 ml-1">只</span></span>
                                            </div>
                                            <p class="text-sm text-slate-600 mb-3">${record.notes}</p>
                                            <div class="flex items-center justify-between pt-3 border-t border-slate-100">
                                                <div class="flex items-center gap-4 text-sm text-slate-500">
                                                    <span><i class="fas fa-calendar-alt mr-1"></i>${record.observationDate}</span>
                                                    <span><i class="fas fa-user mr-1"></i>${record.observer}</span>
                                                </div>
                                                <button class="text-primary-600 hover:text-primary-700 text-sm font-medium">
                                                    查看详情 <i class="fas fa-arrow-right ml-1"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </div>
        `;
    },

    renderRinging(container) {
        container.innerHTML = `
            <div class="mb-6 flex items-center justify-between">
                <div>
                    <h2 class="text-2xl font-serif font-semibold text-slate-800 mb-1">环志回收</h2>
                    <p class="text-slate-500 text-sm">鸟类环志与回收管理</p>
                </div>
                <div class="flex gap-2">
                    <button class="btn btn-secondary">
                        <i class="fas fa-search"></i>
                        环志查询
                    </button>
                    <button class="btn btn-primary">
                        <i class="fas fa-plus"></i>
                        新增环志
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                    <div class="flex items-center gap-3 mb-3">
                        <div class="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center">
                            <i class="fas fa-ring text-sky-500"></i>
                        </div>
                        <div>
                            <p class="text-sm text-slate-500">总环志数</p>
                            <p class="text-2xl font-bold text-slate-800">${MockData.birdRings.length}</p>
                        </div>
                    </div>
                </div>
                <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                    <div class="flex items-center gap-3 mb-3">
                        <div class="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                            <i class="fas fa-check-circle text-emerald-500"></i>
                        </div>
                        <div>
                            <p class="text-sm text-slate-500">已回收</p>
                            <p class="text-2xl font-bold text-slate-800">${MockData.ringRecoveries.length}</p>
                        </div>
                    </div>
                </div>
                <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                    <div class="flex items-center gap-3 mb-3">
                        <div class="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                            <i class="fas fa-eye text-amber-500"></i>
                        </div>
                        <div>
                            <p class="text-sm text-slate-500">监测中</p>
                            <p class="text-2xl font-bold text-slate-800">${MockData.birdRings.filter(r => r.status === '监测中').length}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div class="p-4 border-b border-slate-100 flex items-center justify-between">
                        <h3 class="font-semibold text-slate-700">环志记录</h3>
                        <div class="relative">
                            <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                            <input type="text" placeholder="搜索环志号..." class="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm w-40 focus:outline-none focus:ring-2 focus:ring-primary-500">
                        </div>
                    </div>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>环志编号</th>
                                <th>物种</th>
                                <th>环志日期</th>
                                <th>状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${MockData.birdRings.map(ring => {
                                const statusClass = ring.status === '已回收' ? 'status-online' : 'status-pending';
                                return `
                                    <tr class="cursor-pointer hover:bg-slate-50">
                                        <td class="font-mono text-sm text-slate-700">${ring.ringNumber}</td>
                                        <td class="text-slate-700">${ring.speciesName}</td>
                                        <td class="text-slate-500 text-sm">${ring.ringDate}</td>
                                        <td>
                                            <span class="status-badge ${statusClass}">
                                                <span class="w-1.5 h-1.5 rounded-full ${ring.status === '已回收' ? 'bg-emerald-500' : 'bg-sky-500'}"></span>
                                                ${ring.status}
                                            </span>
                                        </td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>

                <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div class="p-4 border-b border-slate-100">
                        <h3 class="font-semibold text-slate-700">回收记录</h3>
                    </div>
                    <div class="p-4 space-y-4">
                        ${MockData.ringRecoveries.map(recovery => {
                            return `
                                <div class="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
                                    <div class="flex items-start justify-between mb-3">
                                        <div>
                                            <p class="font-medium text-slate-800">${recovery.speciesName}</p>
                                            <p class="text-xs text-slate-500 font-mono">${recovery.ringNumber}</p>
                                        </div>
                                        <span class="px-2 py-0.5 bg-emerald-100 text-emerald-600 text-xs font-medium rounded-full">已回收</span>
                                    </div>
                                    <div class="grid grid-cols-2 gap-3 text-sm">
                                        <div>
                                            <p class="text-slate-400 text-xs mb-0.5">回收日期</p>
                                            <p class="text-slate-700">${recovery.recoveryDate}</p>
                                        </div>
                                        <div>
                                            <p class="text-slate-400 text-xs mb-0.5">回收地点</p>
                                            <p class="text-slate-700">${recovery.recoveryLocation}</p>
                                        </div>
                                        <div>
                                            <p class="text-slate-400 text-xs mb-0.5">回收方式</p>
                                            <p class="text-slate-700">${recovery.recoveryMethod}</p>
                                        </div>
                                        <div>
                                            <p class="text-slate-400 text-xs mb-0.5">健康状况</p>
                                            <p class="text-slate-700">${recovery.condition}</p>
                                        </div>
                                    </div>
                                    <div class="mt-3 pt-3 border-t border-emerald-200 flex items-center justify-between">
                                        <span class="text-xs text-slate-500">发现人: ${recovery.finder}</span>
                                        <button class="text-xs text-emerald-600 hover:text-emerald-700 font-medium">
                                            查看溯源 <i class="fas fa-arrow-right ml-1"></i>
                                        </button>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </div>
        `;
    }
};
