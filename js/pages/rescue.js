// 救助登记模块

const RescuePage = {
    rescueSearch: '',
    rescueStatus: 'all',
    selectedRescueId: null,

    renderRecords: function(container) {
        var self = this;
        var pageContainer = container;

        var statusColors = {
            '治疗中': 'bg-amber-100 text-amber-700',
            '康复中': 'bg-sky-100 text-sky-700',
            '已放归': 'bg-emerald-100 text-emerald-700'
        };

        var injuryColors = {
            '轻度': 'bg-emerald-100 text-emerald-600',
            '中度': 'bg-amber-100 text-amber-600',
            '严重': 'bg-rose-100 text-rose-600'
        };

        var speciesOptions = MockData.species.map(function(s) {
            return '<option value="' + s.name + '">' + s.name + '</option>';
        }).join('');

        var now = new Date();
        var y = now.getFullYear();
        var m = String(now.getMonth() + 1).padStart(2, '0');
        var d = String(now.getDate()).padStart(2, '0');
        var today = y + '-' + m + '-' + d;

        var query = (this.rescueSearch || '').trim().toLowerCase();
        var statusVal = this.rescueStatus || 'all';

        var filteredRecords = MockData.rescueRecords.filter(function(record) {
            var matchQuery = !query ||
                             record.speciesName.toLowerCase().indexOf(query) !== -1 ||
                             record.rescueLocation.toLowerCase().indexOf(query) !== -1 ||
                             record.injuryType.toLowerCase().indexOf(query) !== -1;
            var matchStatus = statusVal === 'all' || record.status === statusVal;
            return matchQuery && matchStatus;
        });

        var total = filteredRecords.length;
        var treating = filteredRecords.filter(function(r) { return r.status === '治疗中'; }).length;
        var recovering = filteredRecords.filter(function(r) { return r.status === '康复中'; }).length;
        var released = filteredRecords.filter(function(r) { return r.status === '已放归'; }).length;

        var searchEscaped = this.rescueSearch ? this.rescueSearch.replace(/"/g, '&quot;') : '';

        var statusBtns = [
            { key: 'all', label: '全部' },
            { key: '治疗中', label: '治疗中' },
            { key: '康复中', label: '康复中' },
            { key: '已放归', label: '已放归' }
        ];

        var statusBtnsHtml = statusBtns.map(function(btn) {
            var active = self.rescueStatus === btn.key;
            var cls = active
                ? 'px-3 py-1.5 text-sm bg-primary-50 text-primary-600 rounded-lg font-medium cursor-default rescue-status-btn'
                : 'px-3 py-1.5 text-sm text-slate-500 hover:bg-slate-100 rounded-lg cursor-pointer rescue-status-btn';
            return '<button class="' + cls + '" data-status="' + btn.key + '">' + btn.label + '</button>';
        }).join('');

        var recordsHtml = filteredRecords.length > 0 ? filteredRecords.map(function(record) {
            return '<div class="border border-slate-100 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer rescue-record-card" data-id="' + record.id + '">' +
                '<div class="flex items-start justify-between mb-3">' +
                    '<div class="flex items-center gap-3">' +
                        '<div class="w-14 h-14 rounded-xl bg-gradient-to-br from-rose-100 to-amber-100 flex items-center justify-center">' +
                            '<i class="fas fa-dove text-2xl text-rose-500"></i>' +
                        '</div>' +
                        '<div>' +
                            '<h3 class="font-semibold text-slate-800">' + record.speciesName + '</h3>' +
                            '<p class="text-xs text-slate-500">' + record.age + ' · ' + record.gender + '</p>' +
                        '</div>' +
                    '</div>' +
                    '<span class="px-2.5 py-1 ' + statusColors[record.status] + ' text-xs font-medium rounded-full">' + record.status + '</span>' +
                '</div>' +
                '<div class="space-y-2 mb-4">' +
                    '<div class="flex items-center gap-2 text-sm text-slate-600">' +
                        '<i class="fas fa-heartbeat text-rose-400 w-4"></i>' +
                        '<span class="' + injuryColors[record.injuryDegree] + ' px-2 py-0.5 rounded text-xs font-medium">' + record.injuryDegree + '</span>' +
                        '<span class="text-slate-500">' + record.injuryType + '</span>' +
                    '</div>' +
                    '<div class="flex items-center gap-2 text-sm text-slate-600">' +
                        '<i class="fas fa-map-marker-alt text-primary-400 w-4"></i>' +
                        '<span>' + record.rescueLocation + '</span>' +
                    '</div>' +
                    '<div class="flex items-center gap-2 text-sm text-slate-600">' +
                        '<i class="fas fa-calendar text-sky-400 w-4"></i>' +
                        '<span>' + record.rescueDate + '</span>' +
                    '</div>' +
                    '<div class="flex items-center gap-2 text-sm text-slate-600">' +
                        '<i class="fas fa-user text-slate-400 w-4"></i>' +
                        '<span>救助人: ' + record.rescuer + '</span>' +
                    '</div>' +
                '</div>' +
                '<button class="w-full py-2 bg-slate-50 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-100 transition-colors">' +
                    '查看详情' +
                '</button>' +
            '</div>';
        }).join('') : '<div class="col-span-full py-16 text-center">' +
            '<i class="fas fa-search text-5xl text-slate-200 mb-4"></i>' +
            '<p class="text-slate-500">没有找到匹配的救助记录</p>' +
            '<p class="text-sm text-slate-400 mt-1">请尝试其他关键词或状态</p>' +
        '</div>';

        container.innerHTML = '<div class="mb-6 flex items-center justify-between">' +
                '<div>' +
                    '<h2 class="text-2xl font-serif font-semibold text-slate-800 mb-1">救助记录</h2>' +
                    '<p class="text-slate-500 text-sm">伤病鸟救助登记和管理，当前筛选共 ' + total + ' 条</p>' +
                '</div>' +
                '<button id="addRescueBtn" class="btn btn-primary">' +
                    '<i class="fas fa-plus"></i>' +
                    '新增救助' +
                '</button>' +
            '</div>' +

            '<div id="addRescueForm" class="hidden mb-6 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">' +
                '<div class="flex items-center justify-between mb-5">' +
                    '<h3 class="text-lg font-semibold text-slate-800">新增救助登记</h3>' +
                    '<button id="cancelAddRescue" class="text-slate-400 hover:text-slate-600 transition-colors">' +
                        '<i class="fas fa-times text-xl"></i>' +
                    '</button>' +
                '</div>' +
                '<form id="rescueForm" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">' +
                    '<div>' +
                        '<label class="text-sm text-slate-600 mb-1.5 block">物种名称 <span class="text-rose-500">*</span></label>' +
                        '<select id="rescSpecies" class="form-input" required>' +
                            '<option value="">请选择物种</option>' + speciesOptions +
                        '</select>' +
                    '</div>' +
                    '<div>' +
                        '<label class="text-sm text-slate-600 mb-1.5 block">救助日期 <span class="text-rose-500">*</span></label>' +
                        '<input type="date" id="rescDate" value="' + today + '" class="form-input" required>' +
                    '</div>' +
                    '<div>' +
                        '<label class="text-sm text-slate-600 mb-1.5 block">救助地点 <span class="text-rose-500">*</span></label>' +
                        '<input type="text" id="rescLocation" class="form-input" placeholder="如：南岸滩涂区" required>' +
                    '</div>' +
                    '<div>' +
                        '<label class="text-sm text-slate-600 mb-1.5 block">伤情类型 <span class="text-rose-500">*</span></label>' +
                        '<input type="text" id="rescInjuryType" class="form-input" placeholder="如：翅膀受伤、腿部骨折" required>' +
                    '</div>' +
                    '<div>' +
                        '<label class="text-sm text-slate-600 mb-1.5 block">伤情程度 <span class="text-rose-500">*</span></label>' +
                        '<select id="rescInjuryDegree" class="form-input" required>' +
                            '<option value="轻度">轻度</option>' +
                            '<option value="中度">中度</option>' +
                            '<option value="严重">严重</option>' +
                        '</select>' +
                    '</div>' +
                    '<div>' +
                        '<label class="text-sm text-slate-600 mb-1.5 block">当前状态 <span class="text-rose-500">*</span></label>' +
                        '<select id="rescStatus" class="form-input" required>' +
                            '<option value="治疗中">治疗中</option>' +
                            '<option value="康复中">康复中</option>' +
                            '<option value="已放归">已放归</option>' +
                        '</select>' +
                    '</div>' +
                    '<div>' +
                        '<label class="text-sm text-slate-600 mb-1.5 block">年龄</label>' +
                        '<select id="rescAge" class="form-input">' +
                            '<option value="成鸟">成鸟</option>' +
                            '<option value="亚成体">亚成体</option>' +
                            '<option value="幼鸟">幼鸟</option>' +
                            '<option value="未知">未知</option>' +
                        '</select>' +
                    '</div>' +
                    '<div>' +
                        '<label class="text-sm text-slate-600 mb-1.5 block">性别</label>' +
                        '<select id="rescGender" class="form-input">' +
                            '<option value="未知">未知</option>' +
                            '<option value="雄性">雄性</option>' +
                            '<option value="雌性">雌性</option>' +
                        '</select>' +
                    '</div>' +
                    '<div>' +
                        '<label class="text-sm text-slate-600 mb-1.5 block">救助人</label>' +
                        '<input type="text" id="rescRescuer" value="当前用户" class="form-input" placeholder="请输入救助人姓名">' +
                    '</div>' +
                    '<div class="md:col-span-2 lg:col-span-3">' +
                        '<label class="text-sm text-slate-600 mb-1.5 block">救助备注</label>' +
                        '<textarea id="rescNotes" rows="2" class="form-input resize-none" placeholder="请描述救助现场情况..."></textarea>' +
                    '</div>' +
                    '<div class="md:col-span-2 lg:col-span-3 flex justify-end gap-3 pt-2">' +
                        '<button type="button" id="cancelRescueBtn2" class="btn btn-secondary">取消</button>' +
                        '<button type="submit" class="btn btn-primary">' +
                            '<i class="fas fa-save"></i>保存救助记录' +
                        '</button>' +
                    '</div>' +
                '</form>' +
            '</div>' +

            '<div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">' +
                '<div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center gap-4">' +
                    '<div class="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center">' +
                        '<i class="fas fa-heartbeat text-rose-500 text-xl"></i>' +
                    '</div>' +
                    '<div>' +
                        '<p class="text-2xl font-bold text-slate-800">' + total + '</p>' +
                        '<p class="text-sm text-slate-500">筛选结果</p>' +
                    '</div>' +
                '</div>' +
                '<div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center gap-4">' +
                    '<div class="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">' +
                        '<i class="fas fa-stethoscope text-amber-500 text-xl"></i>' +
                    '</div>' +
                    '<div>' +
                        '<p class="text-2xl font-bold text-slate-800">' + treating + '</p>' +
                        '<p class="text-sm text-slate-500">治疗中</p>' +
                    '</div>' +
                '</div>' +
                '<div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center gap-4">' +
                    '<div class="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center">' +
                        '<i class="fas fa-heart text-sky-500 text-xl"></i>' +
                    '</div>' +
                    '<div>' +
                        '<p class="text-2xl font-bold text-slate-800">' + recovering + '</p>' +
                        '<p class="text-sm text-slate-500">康复中</p>' +
                    '</div>' +
                '</div>' +
                '<div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center gap-4">' +
                    '<div class="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">' +
                        '<i class="fas fa-dove text-emerald-500 text-xl"></i>' +
                    '</div>' +
                    '<div>' +
                        '<p class="text-2xl font-bold text-slate-800">' + released + '</p>' +
                        '<p class="text-sm text-slate-500">已放归</p>' +
                    '</div>' +
                '</div>' +
            '</div>' +

            '<div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">' +
                '<div class="p-4 border-b border-slate-100 flex items-center justify-between">' +
                    '<div class="flex items-center gap-2">' + statusBtnsHtml + '</div>' +
                    '<div class="relative">' +
                        '<i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>' +
                        '<input type="text" id="rescueSearchInput" placeholder="搜索物种、地点、伤情..." value="' + searchEscaped + '" class="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-primary-500">' +
                    '</div>' +
                '</div>' +
                '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">' + recordsHtml + '</div>' +
            '</div>';

        setTimeout(function() {
            self.bindRescueEvents(pageContainer);
        }, 0);
    },

    bindRescueEvents: function(pageContainer) {
        var self = this;

        var searchInput = document.getElementById('rescueSearchInput');
        if (searchInput) {
            searchInput.focus();
            var val = searchInput.value;
            searchInput.value = '';
            searchInput.value = val;

            searchInput.addEventListener('input', function(e) {
                self.rescueSearch = e.target.value;
                self.renderRecords(pageContainer);
            });
        }

        var statusBtns = document.querySelectorAll('.rescue-status-btn');
        for (var i = 0; i < statusBtns.length; i++) {
            (function(btn) {
                btn.addEventListener('click', function() {
                    self.rescueStatus = btn.getAttribute('data-status');
                    self.renderRecords(pageContainer);
                });
            })(statusBtns[i]);
        }

        // 新增救助表单
        var addBtn = document.getElementById('addRescueBtn');
        var cancelBtn1 = document.getElementById('cancelAddRescue');
        var cancelBtn2 = document.getElementById('cancelRescueBtn2');
        var form = document.getElementById('addRescueForm');

        function toggleForm(show) {
            if (form) {
                if (show) {
                    form.classList.remove('hidden');
                    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    form.classList.add('hidden');
                }
            }
        }

        if (addBtn) {
            addBtn.addEventListener('click', function() { toggleForm(true); });
        }
        if (cancelBtn1) {
            cancelBtn1.addEventListener('click', function() { toggleForm(false); });
        }
        if (cancelBtn2) {
            cancelBtn2.addEventListener('click', function() { toggleForm(false); });
        }

        // 表单提交
        var rescueForm = document.getElementById('rescueForm');
        if (rescueForm) {
            rescueForm.addEventListener('submit', function(e) {
                e.preventDefault();

                var speciesName = document.getElementById('rescSpecies').value;
                var rescueDate = document.getElementById('rescDate').value;
                var rescueLocation = document.getElementById('rescLocation').value.trim();
                var injuryType = document.getElementById('rescInjuryType').value.trim();
                var injuryDegree = document.getElementById('rescInjuryDegree').value;
                var status = document.getElementById('rescStatus').value;
                var age = document.getElementById('rescAge').value;
                var gender = document.getElementById('rescGender').value;
                var rescuer = document.getElementById('rescRescuer').value.trim() || '当前用户';

                if (!speciesName || !rescueDate || !rescueLocation || !injuryType) {
                    alert('请填写完整的必填项');
                    return;
                }

                // 创建新记录
                var newRecord = {
                    id: 'RR' + Date.now(),
                    speciesName: speciesName,
                    rescueDate: rescueDate,
                    rescueLocation: rescueLocation,
                    injuryType: injuryType,
                    injuryDegree: injuryDegree,
                    rescuer: rescuer,
                    status: status,
                    age: age,
                    gender: gender
                };

                // 加入MockData
                MockData.rescueRecords.unshift(newRecord);

                // 保存到localStorage
                try {
                    var stored = localStorage.getItem('bird_reserve_new_rescues');
                    var newRecords = stored ? JSON.parse(stored) : [];
                    newRecords.unshift(newRecord);
                    localStorage.setItem('bird_reserve_new_rescues', JSON.stringify(newRecords));
                } catch (err) {
                    console.error('保存失败', err);
                }

                alert('救助记录保存成功！');
                self.renderRecords(pageContainer);
            });
        }
    },

    renderTreatment: function(container) {
        var self = this;
        var pageContainer = container;

        // 筛选未放归的救助记录
        var activeRescues = MockData.rescueRecords.filter(function(r) { return r.status !== '已放归'; });

        // 默认选中第一条，或保持上次选择
        var selectedId = this.selectedRescueId;
        if (!selectedId || !activeRescues.find(function(r) { return r.id === selectedId; })) {
            selectedId = activeRescues.length > 0 ? activeRescues[0].id : null;
        }
        this.selectedRescueId = selectedId;

        var selectedRecord = activeRescues.find(function(r) { return r.id === selectedId; });

        var injuryColors = {
            '轻度': 'bg-emerald-100 text-emerald-600',
            '中度': 'bg-amber-100 text-amber-600',
            '严重': 'bg-rose-100 text-rose-600'
        };

        var statusColors = {
            '治疗中': 'bg-amber-100 text-amber-700',
            '康复中': 'bg-sky-100 text-sky-700',
            '已放归': 'bg-emerald-100 text-emerald-700'
        };

        // 获取当前日期
        var now = new Date();
        var y = now.getFullYear();
        var m = String(now.getMonth() + 1).padStart(2, '0');
        var d = String(now.getDate()).padStart(2, '0');
        var today = y + '-' + m + '-' + d;

        // 左侧救助列表
        var listHtml = activeRescues.map(function(record) {
            var active = record.id === selectedId;
            var cls = active ? 'p-3 rounded-xl cursor-pointer transition-colors bg-primary-50 border border-primary-200' :
                             'p-3 rounded-xl cursor-pointer transition-colors hover:bg-slate-50';
            return '<div class="' + cls + '" data-id="' + record.id + '">' +
                '<div class="flex items-center gap-3">' +
                    '<div class="w-10 h-10 rounded-lg bg-gradient-to-br from-rose-100 to-amber-100 flex items-center justify-center">' +
                        '<i class="fas fa-dove text-rose-500"></i>' +
                    '</div>' +
                    '<div class="flex-1 min-w-0">' +
                        '<h4 class="text-sm font-medium text-slate-700 truncate">' + record.speciesName + '</h4>' +
                        '<p class="text-xs text-slate-500">' + record.injuryType + ' · ' + record.status + '</p>' +
                    '</div>' +
                '</div>' +
            '</div>';
        }).join('');

        // 右侧治疗详情
        var detailHtml = '';
        if (selectedRecord) {
            var injuryClass = injuryColors[selectedRecord.injuryDegree] || 'bg-slate-100 text-slate-600';
            var statusClass = statusColors[selectedRecord.status] || 'bg-slate-100 text-slate-600';

            // 查找该救助的治疗日志
            var logs = MockData.treatmentLogs.filter(function(l) { return l.rescueId === selectedId; });

            var logsHtml = logs.length > 0 ? logs.map(function(log) {
                return '<div class="relative">' +
                    '<div class="absolute -left-[22px] top-1 w-4 h-4 rounded-full bg-white border-2 border-primary-500 flex items-center justify-center">' +
                        '<span class="w-1.5 h-1.5 rounded-full bg-primary-500"></span>' +
                    '</div>' +
                    '<div class="bg-slate-50 rounded-xl p-4">' +
                        '<div class="flex items-center justify-between mb-2">' +
                            '<span class="text-sm font-medium text-slate-700">' + log.treatment + '</span>' +
                            '<span class="text-xs text-slate-400">' + log.logDate + '</span>' +
                        '</div>' +
                        '<p class="text-sm text-slate-600 mb-2">' + log.notes + '</p>' +
                        '<span class="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-600 text-xs font-medium rounded-full">' +
                            log.status +
                        '</span>' +
                    '</div>' +
                '</div>';
            }).join('') : '<div class="text-center py-8 text-slate-400">' +
                '<i class="fas fa-file-medical text-4xl mb-3 block"></i>' +
                '<p>暂无治疗记录</p>' +
            '</div>';

            detailHtml = '<div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">' +
                '<div class="flex items-start justify-between mb-6 pb-5 border-b border-slate-100">' +
                    '<div class="flex items-center gap-4">' +
                        '<div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-100 to-amber-100 flex items-center justify-center">' +
                            '<i class="fas fa-dove text-3xl text-rose-500"></i>' +
                        '</div>' +
                        '<div>' +
                            '<h3 class="text-lg font-semibold text-slate-800">' + selectedRecord.speciesName + '</h3>' +
                            '<p class="text-sm text-slate-500">' + selectedRecord.age + ' · ' + selectedRecord.gender + '</p>' +
                            '<div class="flex items-center gap-2 mt-2">' +
                                '<span class="px-2 py-0.5 ' + injuryClass + ' text-xs font-medium rounded-full">' + selectedRecord.injuryDegree + '受伤</span>' +
                                '<span class="px-2 py-0.5 ' + statusClass + ' text-xs font-medium rounded-full">' + selectedRecord.status + '</span>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<button id="addTreatmentBtn" class="btn btn-secondary">' +
                        '<i class="fas fa-plus"></i>添加治疗记录' +
                    '</button>' +
                '</div>' +

                '<!-- 添加治疗记录表单（默认隐藏） -->' +
                '<div id="addTreatmentForm" class="hidden mb-6 bg-slate-50 rounded-xl p-5 border border-slate-200">' +
                    '<h4 class="font-semibold text-slate-700 mb-4">追加治疗日志</h4>' +
                    '<form id="treatmentForm" class="space-y-4">' +
                        '<div class="grid grid-cols-1 md:grid-cols-2 gap-4">' +
                            '<div>' +
                                '<label class="text-sm text-slate-600 mb-1.5 block">治疗日期 <span class="text-rose-500">*</span></label>' +
                                '<input type="date" id="treatDate" value="' + today + '" class="form-input" required>' +
                            '</div>' +
                            '<div>' +
                                '<label class="text-sm text-slate-600 mb-1.5 block">当前状态 <span class="text-rose-500">*</span></label>' +
                                '<select id="treatStatus" class="form-input" required>' +
                                    '<option value="病情稳定">病情稳定</option>' +
                                    '<option value="恢复良好">恢复良好</option>' +
                                    '<option value="术后观察">术后观察</option>' +
                                    '<option value="逐渐恢复">逐渐恢复</option>' +
                                    '<option value="需进一步治疗">需进一步治疗</option>' +
                                '</select>' +
                            '</div>' +
                        '</div>' +
                        '<div>' +
                            '<label class="text-sm text-slate-600 mb-1.5 block">治疗措施 <span class="text-rose-500">*</span></label>' +
                            '<input type="text" id="treatTreatment" class="form-input" placeholder="如：伤口清理消毒，抗生素注射" required>' +
                        '</div>' +
                        '<div>' +
                            '<label class="text-sm text-slate-600 mb-1.5 block">治疗备注 <span class="text-rose-500">*</span></label>' +
                            '<textarea id="treatNotes" rows="2" class="form-input resize-none" placeholder="请描述治疗情况、鸟只状态..." required></textarea>' +
                        '</div>' +
                        '<div class="flex justify-end gap-3 pt-2">' +
                            '<button type="button" id="cancelTreatBtn" class="btn btn-secondary">取消</button>' +
                            '<button type="submit" class="btn btn-primary">' +
                                '<i class="fas fa-save"></i>保存治疗记录' +
                            '</button>' +
                        '</div>' +
                    '</form>' +
                '</div>' +

                '<div class="mb-4">' +
                    '<h4 class="font-semibold text-slate-700 mb-4">治疗时间线</h4>' +
                    '<div class="relative pl-6 space-y-5">' +
                        '<div class="absolute left-[7px] top-1 bottom-1 w-0.5 bg-gradient-to-b from-primary-300 via-primary-400 to-primary-200"></div>' +
                        logsHtml +
                    '</div>' +
                '</div>' +
            '</div>';
        } else {
            detailHtml = '<div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center">' +
                '<i class="fas fa-paw text-5xl text-slate-200 mb-4"></i>' +
                '<p class="text-slate-500">请先在救助记录中添加救助对象</p>' +
                '<button onclick="App.renderPage(\'rescue-records\')" class="btn btn-primary mt-4">' +
                    '<i class="fas fa-plus"></i>新增救助' +
                '</button>' +
            '</div>';
        }

        container.innerHTML = '<div class="mb-6">' +
                '<h2 class="text-2xl font-serif font-semibold text-slate-800 mb-1">治疗跟踪</h2>' +
                '<p class="text-slate-500 text-sm">记录和跟踪伤病鸟的治疗过程，共 ' + activeRescues.length + ' 个正在治疗对象</p>' +
            '</div>' +

            '<div class="grid grid-cols-1 lg:grid-cols-3 gap-5">' +
                '<div class="lg:col-span-1 space-y-3">' +
                    '<div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">' +
                        '<div class="relative mb-4">' +
                            '<i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>' +
                            '<input type="text" id="treatSearchInput" placeholder="搜索救助记录..." class="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">' +
                        '</div>' +
                        '<div id="treatList" class="space-y-2 max-h-[500px] overflow-y-auto">' +
                            (activeRescues.length > 0 ? listHtml : '<div class="text-center py-8 text-slate-400"><i class="fas fa-inbox text-3xl mb-2"></i><p class="text-sm">暂无正在治疗的对象</p></div>') +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="lg:col-span-2" id="treatDetailContainer">' + detailHtml + '</div>' +
            '</div>';

        setTimeout(function() {
            self.bindTreatmentEvents(pageContainer);
        }, 0);
    },

    bindTreatmentEvents: function(pageContainer) {
        var self = this;

        // 左侧列表点击事件
        var listItems = document.querySelectorAll('#treatList > div[data-id]');
        for (var i = 0; i < listItems.length; i++) {
            (function(item) {
                item.addEventListener('click', function() {
                    self.selectedRescueId = item.getAttribute('data-id');
                    self.renderTreatment(pageContainer);
                });
            })(listItems[i]);
        }

        // 搜索
        var searchInput = document.getElementById('treatSearchInput');
        if (searchInput) {
            searchInput.addEventListener('input', function(e) {
                var query = e.target.value.trim().toLowerCase();
                var items = document.querySelectorAll('#treatList > div[data-id]');
                for (var j = 0; j < items.length; j++) {
                    var item = items[j];
                    var text = item.textContent.toLowerCase();
                    item.style.display = !query || text.indexOf(query) !== -1 ? '' : 'none';
                }
            });
        }

        // 新增治疗记录表单
        var addBtn = document.getElementById('addTreatmentBtn');
        var cancelBtn = document.getElementById('cancelTreatBtn');
        var form = document.getElementById('addTreatmentForm');

        function toggleForm(show) {
            if (form) {
                if (show) {
                    form.classList.remove('hidden');
                    form.scrollIntoView({ behavior: 'smooth', block: 'center' });
                } else {
                    form.classList.add('hidden');
                }
            }
        }

        if (addBtn) {
            addBtn.addEventListener('click', function() { toggleForm(true); });
        }
        if (cancelBtn) {
            cancelBtn.addEventListener('click', function() { toggleForm(false); });
        }

        // 治疗日志提交
        var treatmentForm = document.getElementById('treatmentForm');
        if (treatmentForm) {
            treatmentForm.addEventListener('submit', function(e) {
                e.preventDefault();

                var logDate = document.getElementById('treatDate').value;
                var status = document.getElementById('treatStatus').value;
                var treatment = document.getElementById('treatTreatment').value.trim();
                var notes = document.getElementById('treatNotes').value.trim();

                if (!logDate || !status || !treatment || !notes) {
                    alert('请填写完整的必填项');
                    return;
                }

                // 创建新日志
                var newLog = {
                    id: 'TL' + Date.now(),
                    rescueId: self.selectedRescueId,
                    logDate: logDate,
                    treatment: treatment,
                    status: status,
                    notes: notes
                };

                // 加入MockData
                MockData.treatmentLogs.push(newLog);

                // 保存到localStorage
                try {
                    var stored = localStorage.getItem('bird_reserve_treatment_logs');
                    var newLogs = stored ? JSON.parse(stored) : [];
                    newLogs.push(newLog);
                    localStorage.setItem('bird_reserve_treatment_logs', JSON.stringify(newLogs));
                } catch (err) {
                    console.error('保存失败', err);
                }

                alert('治疗日志保存成功！');
                self.renderTreatment(pageContainer);
            });
        }
    },

    renderRelease: function(container) {
        var releaseRecords = MockData.releaseRecords;
        var totalReleased = releaseRecords.length;

        var recordsHtml = releaseRecords.map(function(record) {
            return '<div class="p-5 hover:bg-slate-50 transition-colors">' +
                '<div class="flex items-start gap-5">' +
                    '<div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center flex-shrink-0">' +
                        '<i class="fas fa-dove text-3xl text-emerald-500"></i>' +
                    '</div>' +
                    '<div class="flex-1 min-w-0">' +
                        '<div class="flex items-center justify-between mb-2">' +
                            '<h4 class="text-lg font-semibold text-slate-800">' + record.speciesName + '</h4>' +
                            '<span class="px-3 py-1 bg-emerald-100 text-emerald-600 text-sm font-medium rounded-full">' +
                                '<i class="fas fa-check-circle mr-1"></i>已放归' +
                            '</span>' +
                        '</div>' +
                        '<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">' +
                            '<div>' +
                                '<p class="text-xs text-slate-400 mb-1">放归日期</p>' +
                                '<p class="text-sm text-slate-700 font-medium">' + record.releaseDate + '</p>' +
                            '</div>' +
                            '<div>' +
                                '<p class="text-xs text-slate-400 mb-1">放归地点</p>' +
                                '<p class="text-sm text-slate-700 font-medium">' + record.releaseLocation + '</p>' +
                            '</div>' +
                            '<div>' +
                                '<p class="text-xs text-slate-400 mb-1">健康评估</p>' +
                                '<p class="text-sm text-slate-700 font-medium">' + record.healthAssessment + '</p>' +
                            '</div>' +
                            '<div>' +
                                '<p class="text-xs text-slate-400 mb-1">放归人</p>' +
                                '<p class="text-sm text-slate-700 font-medium">' + record.releaser + '</p>' +
                            '</div>' +
                        '</div>' +
                        '<p class="text-sm text-slate-500 bg-emerald-50 p-3 rounded-lg">' +
                            '<i class="fas fa-quote-left text-emerald-300 mr-2"></i>' +
                            record.notes +
                        '</p>' +
                    '</div>' +
                '</div>' +
            '</div>';
        }).join('');

        container.innerHTML = '<div class="mb-6 flex items-center justify-between">' +
                '<div>' +
                    '<h2 class="text-2xl font-serif font-semibold text-slate-800 mb-1">放归登记</h2>' +
                    '<p class="text-slate-500 text-sm">记录康复鸟类的放归信息</p>' +
                '</div>' +
                '<button class="btn btn-primary">' +
                    '<i class="fas fa-plus"></i>登记放归' +
                '</button>' +
            '</div>' +

            '<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">' +
                '<div class="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-5 text-white">' +
                    '<div class="flex items-center gap-3 mb-3">' +
                        '<div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">' +
                            '<i class="fas fa-dove text-white"></i>' +
                        '</div>' +
                        '<div>' +
                            '<p class="text-white/80 text-sm">总放归数</p>' +
                            '<p class="text-3xl font-bold">' + totalReleased + '</p>' +
                        '</div>' +
                    '</div>' +
                    '<p class="text-white/70 text-sm">本年度累计放归</p>' +
                '</div>' +
                '<div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">' +
                    '<p class="text-sm text-slate-500 mb-2">成功率</p>' +
                    '<p class="text-3xl font-bold text-emerald-600">100%</p>' +
                    '<p class="text-xs text-slate-400 mt-2">放归后存活率</p>' +
                '</div>' +
                '<div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">' +
                    '<p class="text-sm text-slate-500 mb-2">平均治疗周期</p>' +
                    '<p class="text-3xl font-bold text-slate-800">12.5<span class="text-lg font-normal text-slate-500 ml-1">天</span></p>' +
                    '<p class="text-xs text-slate-400 mt-2">从救助到放归</p>' +
                '</div>' +
            '</div>' +

            '<div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">' +
                '<div class="p-4 border-b border-slate-100">' +
                    '<h3 class="font-semibold text-slate-700">放归记录</h3>' +
                '</div>' +
                '<div class="divide-y divide-slate-100">' + recordsHtml + '</div>' +
            '</div>';
    }
};
