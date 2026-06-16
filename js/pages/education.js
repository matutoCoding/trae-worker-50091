// 科普宣教模块

const EducationPage = {
    selectedReportId: null,

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
        var self = this;
        var statusColors = {
            '已审核': 'bg-emerald-100 text-emerald-600',
            '待审核': 'bg-amber-100 text-amber-600',
            '已驳回': 'bg-rose-100 text-rose-600'
        };

        var typeIcons = {
            '物种调查': 'fa-binoculars',
            '巡护报告': 'fa-hiking',
            '项目汇报': 'fa-tasks',
            '工作总结': 'fa-file-alt'
        };

        var totalCount = MockData.reportRecords.length;
        var reviewedCount = MockData.reportRecords.filter(function(r) { return r.status === '已审核';
        }).length;
        var pendingCount = MockData.reportRecords.filter(function(r) { return r.status === '待审核';
        }).length;

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
                        <p class="text-2xl font-bold text-slate-800">${totalCount}</p>
                        <p class="text-sm text-slate-500">总上报数</p>
                    </div>
                </div>
                <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center gap-4">
                    <div class="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                        <i class="fas fa-check-circle text-emerald-500 text-xl"></i>
                    </div>
                    <div>
                        <p class="text-2xl font-bold text-slate-800">${reviewedCount}</p>
                        <p class="text-sm text-slate-500">已审核</p>
                    </div>
                </div>
                <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center gap-4">
                    <div class="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                        <i class="fas fa-clock text-amber-500 text-xl"></i>
                    </div>
                    <div>
                        <p class="text-2xl font-bold text-slate-800">${pendingCount}</p>
                        <p class="text-sm text-slate-500">待审核</p>
                    </div>
                </div>
                <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center gap-4">
                    <div class="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center">
                        <i class="fas fa-calendar-check text-sky-500 text-xl"></i>
                    </div>
                    <div>
                        <p class="text-2xl font-bold text-slate-800">本月</p>
                        <p class="text-sm text-slate-500">${pendingCount} 份待审</p>
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
                                ${MockData.reportRecords.map(function(record) {
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
                                                    <button class="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors" title="查看" data-report-id="${record.id}" onclick="EducationPage.showReportDetail('${record.id}')">
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
                        <form id="quickReportForm" class="space-y-4">
                            <div>
                                <label class="text-sm text-slate-600 mb-1.5 block">上报标题</label>
                                <input id="reportTitle" type="text" placeholder="请输入标题..." class="form-input">
                            </div>
                            <div>
                                <label class="text-sm text-slate-600 mb-1.5 block">上报类型</label>
                                <select id="reportType" class="form-input">
                                    <option value="">请选择类型</option>
                                    <option value="物种调查">物种调查</option>
                                    <option value="巡护报告">巡护报告</option>
                                    <option value="项目汇报">项目汇报</option>
                                    <option value="工作总结">工作总结</option>
                                </select>
                            </div>
                            <div>
                                <label class="text-sm text-slate-600 mb-1.5 block">上报说明</label>
                                <textarea id="reportNotes" rows="3" placeholder="请简要描述..." class="form-input resize-none"></textarea>
                            </div>
                            <div>
                                <label class="text-sm text-slate-600 mb-1.5 block">附件上传</label>
                                <div class="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-primary-400 hover:bg-primary-50/50 transition-colors cursor-pointer">
                                    <i class="fas fa-cloud-upload-alt text-3xl text-slate-300 mb-2"></i>
                                    <p class="text-sm text-slate-500">点击或拖拽文件到此处上传</p>
                                    <p class="text-xs text-slate-400 mt-1">支持 PDF, Word, Excel 格式</p>
                                </div>
                            </div>
                            <button type="submit" id="submitReportBtn" class="w-full btn btn-primary">
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

            <!-- 详情弹窗 -->
            <div id="reportDetailModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 hidden items-center justify-center p-4">
                <div class="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                    <div class="p-6 border-b border-slate-100 flex items-center justify-between">
                        <h3 class="text-xl font-serif font-semibold text-slate-800">上报详情</h3>
                        <button onclick="EducationPage.closeReportDetail()" class="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                            <i class="fas fa-times text-slate-400"></i>
                        </button>
                    </div>
                    <div id="reportDetailContent" class="p-6">
                    </div>
                </div>
            </div>
        `;

        // 绑定提交事件
        setTimeout(function() {
            self.bindReportForm();
        }, 0);
    },

    showReportDetail: function(reportId) {
        var self = this;
        this.selectedReportId = reportId;
        var report = MockData.reportRecords.find(function(r) { return r.id === reportId; });
        if (!report) return;

        var statusColors = {
            '已审核': 'bg-emerald-100 text-emerald-600',
            '待审核': 'bg-amber-100 text-amber-600',
            '已驳回': 'bg-rose-100 text-rose-600'
        };

        var typeIcons = {
            '物种调查': 'fa-binoculars',
            '巡护报告': 'fa-hiking',
            '项目汇报': 'fa-tasks',
            '工作总结': 'fa-file-alt'
        };

        var content = document.getElementById('reportDetailContent');
        if (!content) return;

        content.innerHTML = `
            <div class="space-y-6">
                <div class="flex items-start gap-4">
                    <div class="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <i class="fas ${typeIcons[report.type] || 'fa-file'} text-primary-500 text-2xl"></i>
                    </div>
                    <div class="flex-1">
                        <h4 class="text-lg font-semibold text-slate-800 mb-1">${report.title}</h4>
                        <div class="flex items-center gap-2">
                            <span class="tag tag-sky">${report.type}</span>
                            <span class="px-2.5 py-1 ${statusColors[report.status]} text-xs font-medium rounded-full">
                                ${report.status}
                            </span>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div class="bg-slate-50 rounded-xl p-4">
                        <p class="text-xs text-slate-500 mb-1">上报人</p>
                        <div class="flex items-center gap-2">
                            <div class="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xs font-medium">
                                ${report.reporter ? report.reporter[0] : 'U'}
                            </div>
                            <span class="font-medium text-slate-700">${report.reporter}</span>
                        </div>
                    </div>
                    <div class="bg-slate-50 rounded-xl p-4">
                        <p class="text-xs text-slate-500 mb-1">上报日期</p>
                        <div class="flex items-center gap-2">
                            <i class="fas fa-calendar text-slate-400"></i>
                            <span class="font-medium text-slate-700">${report.reportDate}</span>
                        </div>
                    </div>
                </div>

                <div class="bg-gradient-to-br from-primary-50 to-teal-50 rounded-xl p-5 border border-primary-100">
                    <div class="flex items-center gap-2 mb-3">
                        <i class="fas fa-file-alt text-primary-500"></i>
                        <h5 class="font-semibold text-primary-800">上报说明</h5>
                    </div>
                    <p class="text-sm text-primary-700 leading-relaxed whitespace-pre-wrap">${report.notes || report.attachment || '无上报说明'}</p>
                </div>

                <div class="flex items-center gap-3 pt-4 border-t border-slate-100">
                    <button onclick="EducationPage.closeReportDetail()" class="flex-1 px-4 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-medium hover:bg-slate-200 transition-colors">
                        关闭
                    </button>
                    <button class="flex-1 px-4 py-2.5 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors">
                        <i class="fas fa-download mr-2"></i>下载附件
                    </button>
                </div>
            </div>
        `;

        var modal = document.getElementById('reportDetailModal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }
    },

    closeReportDetail: function() {
        var modal = document.getElementById('reportDetailModal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
        this.selectedReportId = null;
    },

    bindReportForm: function() {
        var form = document.getElementById('quickReportForm');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            var titleInput = document.getElementById('reportTitle');
            var typeSelect = document.getElementById('reportType');
            var notesTextarea = document.getElementById('reportNotes');

            var title = titleInput.value.trim();
            var type = typeSelect.value;
            var notes = notesTextarea.value.trim();

            if (!title) {
                alert('请输入上报标题');
                titleInput.focus();
                return;
            }
            if (!type) {
                alert('请选择上报类型');
                typeSelect.focus();
                return;
            }

            // 创建新记录
            var today = new Date();
            var yyyy = today.getFullYear();
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var dd = String(today.getDate()).padStart(2, '0');
            var dateStr = yyyy + '-' + mm + '-' + dd;

            var newRecord = {
                id: 'REP' + Date.now(),
                title: title,
                reporter: '当前用户',
                reportDate: dateStr,
                type: type,
                status: '待审核',
                notes: notes || '无上报说明',
                attachment: '(无附件)'
            };

            // 加入MockData
            MockData.reportRecords.unshift(newRecord);

            // 保存到localStorage
            try {
                var stored = localStorage.getItem('bird_reserve_new_reports');
                var newReports = stored ? JSON.parse(stored) : [];
                newReports.unshift(newRecord);
                localStorage.setItem('bird_reserve_new_reports', JSON.stringify(newReports));
            } catch (err) {
                console.error('保存失败', err);
            }

            // 清空表单
            titleInput.value = '';
            typeSelect.value = '';
            notesTextarea.value = '';

            // 提示成功并重新渲染
            alert('上报提交成功，状态为"待审核"');
            App.renderPage('education-reporting');
        });
    }
};
