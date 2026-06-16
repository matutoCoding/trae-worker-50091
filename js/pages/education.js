// 科普宣教模块

const EducationPage = {
    renderBirdwatching(container) {
        const categories = ['全部', '迁徙知识', '生态保护', '观鸟技巧', '物种介绍', '季节观察'];
        const activeCategory = '全部';

        container.innerHTML = `
            <div class="mb-6">
                <h2 class="text-2xl font-serif font-semibold text-slate-800 mb-1">观鸟科普</h2>
                <p class="text-slate-500 text-sm">了解鸟类知识，提升观鸟技能</p>
            </div>

            <div class="flex flex-wrap gap-2 mb-6">
                ${categories.map(cat => `
                    <button class="px-4 py-2 rounded-xl text-sm font-medium transition-all ${cat === activeCategory ? 'bg-primary-500 text-white shadow-md shadow-primary-500/30' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'}">
                        ${cat}
                    </button>
                `).join('')}
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                ${MockData.scienceArticles.map(article => {
                    const categoryColors = {
                        '迁徙知识': 'bg-sky-100 text-sky-600',
                        '生态保护': 'bg-emerald-100 text-emerald-600',
                        '观鸟技巧': 'bg-amber-100 text-amber-600',
                        '物种介绍': 'bg-rose-100 text-rose-600',
                        '季节观察': 'bg-violet-100 text-violet-600'
                    };
                    return `
                        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden card-hover cursor-pointer">
                            <div class="h-40 bg-gradient-to-br from-primary-500 via-teal-500 to-cyan-500 relative">
                                <div class="absolute inset-0 opacity-30 flex items-center justify-center">
                                    <i class="fas fa-feather text-6xl text-white"></i>
                                </div>
                                <div class="absolute top-3 left-3">
                                    <span class="px-2.5 py-1 ${categoryColors[article.category] || 'bg-white/90 text-slate-600'} text-xs font-medium rounded-full backdrop-blur-sm">
                                        ${article.category}
                                    </span>
                                </div>
                                <div class="absolute bottom-3 right-3">
                                    <div class="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                        <i class="fas fa-book-open text-white"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="p-5">
                                <h3 class="text-base font-semibold text-slate-800 mb-2 line-clamp-2">${article.title}</h3>
                                <p class="text-sm text-slate-500 mb-4 line-clamp-2">${article.summary}</p>
                                <div class="flex items-center justify-between pt-3 border-t border-slate-100">
                                    <div class="flex items-center gap-2">
                                        <div class="w-7 h-7 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xs">
                                            ${article.author[0]}
                                        </div>
                                        <span class="text-xs text-slate-500">${article.author}</span>
                                    </div>
                                    <span class="text-xs text-slate-400">${article.date}</span>
                                </div>
                                <div class="flex items-center justify-between mt-3 pt-3 border-t border-slate-50">
                                    <span class="text-xs text-slate-400">
                                        <i class="fas fa-eye mr-1"></i>${article.views.toLocaleString()}
                                    </span>
                                    <span class="text-xs text-slate-400">
                                        <i class="fas fa-heart mr-1"></i>${article.likes}
                                    </span>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>

            <div class="mt-10 bg-gradient-to-r from-primary-600 via-teal-600 to-cyan-600 rounded-2xl p-8 text-white relative overflow-hidden">
                <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div class="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
                <div class="relative z-10">
                    <div class="max-w-2xl">
                        <h3 class="text-2xl font-serif font-semibold mb-3">加入我们的科普志愿者团队</h3>
                        <p class="text-white/80 mb-6">成为鸟类保护科普志愿者，与我们一起传播爱鸟护鸟知识，共同守护这些美丽的生灵。</p>
                        <div class="flex gap-3">
                            <button class="px-6 py-3 bg-white text-primary-600 rounded-xl font-medium hover:shadow-lg transition-all">
                                立即报名
                            </button>
                            <button class="px-6 py-3 bg-white/20 text-white rounded-xl font-medium hover:bg-white/30 transition-all">
                                了解更多
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    renderReporting(container) {
        const statusColors = {
            '已审核': 'bg-emerald-100 text-emerald-600',
            '待审核': 'bg-amber-100 text-amber-600',
            '已驳回': 'bg-rose-100 text-rose-600'
        };

        const typeIcons = {
            '物种调查': 'fa-binoculars',
            '巡护报告': 'fa-hiking',
            '项目汇报': 'fa-tasks',
            '工作总结': 'fa-file-alt'
        };

        container.innerHTML = `
            <div class="mb-6 flex items-center justify-between">
                <div>
                    <h2 class="text-2xl font-serif font-semibold text-slate-800 mb-1">数据上报</h2>
                    <p class="text-slate-500 text-sm">提交和管理监测数据上报</p>
                </div>
                <button class="btn btn-primary" onclick="alert('打开上报表单')">
                    <i class="fas fa-upload"></i>
                    提交上报
                </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center gap-4">
                    <div class="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                        <i class="fas fa-file-upload text-primary-500 text-xl"></i>
                    </div>
                    <div>
                        <p class="text-2xl font-bold text-slate-800">${MockData.reportRecords.length}</p>
                        <p class="text-sm text-slate-500">总上报数</p>
                    </div>
                </div>
                <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center gap-4">
                    <div class="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                        <i class="fas fa-check-circle text-emerald-500 text-xl"></i>
                    </div>
                    <div>
                        <p class="text-2xl font-bold text-slate-800">${MockData.reportRecords.filter(r => r.status === '已审核').length}</p>
                        <p class="text-sm text-slate-500">已审核</p>
                    </div>
                </div>
                <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center gap-4">
                    <div class="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                        <i class="fas fa-clock text-amber-500 text-xl"></i>
                    </div>
                    <div>
                        <p class="text-2xl font-bold text-slate-800">${MockData.reportRecords.filter(r => r.status === '待审核').length}</p>
                        <p class="text-sm text-slate-500">待审核</p>
                    </div>
                </div>
                <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center gap-4">
                    <div class="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center">
                        <i class="fas fa-calendar-check text-sky-500 text-xl"></i>
                    </div>
                    <div>
                        <p class="text-2xl font-bold text-slate-800">本月</p>
                        <p class="text-sm text-slate-500">3 份上报</p>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div class="lg:col-span-2">
                    <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div class="p-4 border-b border-slate-100 flex items-center justify-between">
                            <h3 class="font-semibold text-slate-700">上报记录</h3>
                            <div class="flex items-center gap-2">
                                <select class="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm">
                                    <option>全部类型</option>
                                    <option>物种调查</option>
                                    <option>巡护报告</option>
                                    <option>项目汇报</option>
                                    <option>工作总结</option>
                                </select>
                                <select class="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm">
                                    <option>全部状态</option>
                                    <option>已审核</option>
                                    <option>待审核</option>
                                </select>
                            </div>
                        </div>

                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>标题</th>
                                    <th>类型</th>
                                    <th>上报人</th>
                                    <th>日期</th>
                                    <th>状态</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${MockData.reportRecords.map(record => {
                                    return `
                                        <tr>
                                            <td>
                                                <div class="flex items-center gap-3">
                                                    <div class="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center">
                                                        <i class="fas ${typeIcons[record.type] || 'fa-file'} text-primary-500 text-sm"></i>
                                                    </div>
                                                    <span class="font-medium text-slate-700">${record.title}</span>
                                                </div>
                                            </td>
                                            <td><span class="tag tag-sky">${record.type}</span></td>
                                            <td class="text-slate-600">${record.reporter}</td>
                                            <td class="text-slate-500 text-sm">${record.reportDate}</td>
                                            <td>
                                                <span class="px-2.5 py-1 ${statusColors[record.status]} text-xs font-medium rounded-full">
                                                    ${record.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div class="flex items-center gap-1">
                                                    <button class="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors" title="查看">
                                                        <i class="fas fa-eye"></i>
                                                    </button>
                                                    <button class="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors" title="下载">
                                                        <i class="fas fa-download"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="space-y-5">
                    <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                        <h3 class="font-semibold text-slate-800 mb-4">快速上报</h3>
                        <form class="space-y-4">
                            <div>
                                <label class="text-sm text-slate-600 mb-1.5 block">上报标题</label>
                                <input type="text" placeholder="请输入标题..." class="form-input">
                            </div>
                            <div>
                                <label class="text-sm text-slate-600 mb-1.5 block">上报类型</label>
                                <select class="form-input">
                                    <option>请选择类型</option>
                                    <option>物种调查</option>
                                    <option>巡护报告</option>
                                    <option>项目汇报</option>
                                    <option>工作总结</option>
                                </select>
                            </div>
                            <div>
                                <label class="text-sm text-slate-600 mb-1.5 block">上报说明</label>
                                <textarea rows="3" placeholder="请简要描述..." class="form-input resize-none"></textarea>
                            </div>
                            <div>
                                <label class="text-sm text-slate-600 mb-1.5 block">附件上传</label>
                                <div class="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-primary-400 hover:bg-primary-50/50 transition-colors cursor-pointer">
                                    <i class="fas fa-cloud-upload-alt text-3xl text-slate-300 mb-2"></i>
                                    <p class="text-sm text-slate-500">点击或拖拽文件到此处上传</p>
                                    <p class="text-xs text-slate-400 mt-1">支持 PDF, Word, Excel 格式</p>
                                </div>
                            </div>
                            <button type="button" class="w-full btn btn-primary">
                                <i class="fas fa-paper-plane"></i>
                                提交上报
                            </button>
                        </form>
                    </div>

                    <div class="bg-gradient-to-br from-primary-50 to-teal-50 rounded-2xl p-5 border border-primary-100">
                        <h4 class="font-semibold text-primary-800 mb-3">
                            <i class="fas fa-lightbulb text-amber-500 mr-2"></i>
                            上报须知
                        </h4>
                        <ul class="space-y-2 text-sm text-primary-700">
                            <li class="flex items-start gap-2">
                                <i class="fas fa-check-circle text-emerald-500 mt-0.5"></i>
                                <span>确保数据真实准确</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <i class="fas fa-check-circle text-emerald-500 mt-0.5"></i>
                                <span>附上相关证明材料</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <i class="fas fa-check-circle text-emerald-500 mt-0.5"></i>
                                <span>审核周期约1-3个工作日</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <i class="fas fa-check-circle text-emerald-500 mt-0.5"></i>
                                <span>如有疑问请联系管理员</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }
};
