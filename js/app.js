// 主应用逻辑

const App = {
    currentPage: 'dashboard',
    charts: {},
    maps: {},
    
    init() {
        this.setupNavigation();
        this.handleHashChange();
        window.addEventListener('hashchange', () => this.handleHashChange());
    },

    setupNavigation() {
        // 导航组折叠/展开
        document.querySelectorAll('.nav-group-toggle').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const group = btn.dataset.group;
                const submenu = btn.parentElement.querySelector('.nav-submenu');
                btn.classList.toggle('open');
                submenu.classList.toggle('open');
                submenu.classList.toggle('hidden');
            });
        });

        // 导航项点击
        document.querySelectorAll('.nav-item, .nav-subitem').forEach(item => {
            item.addEventListener('click', (e) => {
                document.querySelectorAll('.nav-item, .nav-subitem').forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                
                const group = item.closest('.nav-group');
                if (group) {
                    const toggle = group.querySelector('.nav-group-toggle');
                    const submenu = group.querySelector('.nav-submenu');
                    toggle.classList.add('open');
                    submenu.classList.add('open');
                    submenu.classList.remove('hidden');
                }
            });
        });
    },

    handleHashChange() {
        const hash = window.location.hash.slice(1) || 'dashboard';
        this.currentPage = hash;
        this.renderPage(hash);
        
        this.updateActiveNav(hash);
    },

    updateActiveNav(page) {
        document.querySelectorAll('.nav-item, .nav-subitem').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.page === page) {
                item.classList.add('active');
                const group = item.closest('.nav-group');
                if (group) {
                    const toggle = group.querySelector('.nav-group-toggle');
                    const submenu = group.querySelector('.nav-submenu');
                    toggle.classList.add('open');
                    submenu.classList.add('open');
                    submenu.classList.remove('hidden');
                }
            }
        });
    },

    renderPage(page) {
        const content = document.getElementById('page-content');
        content.innerHTML = '';
        content.className = 'page-enter';

        // 清理旧的图表和地图
        this.clearCharts();
        this.clearMaps();

        switch(page) {
            case 'dashboard':
                DashboardPage.render(content);
                break;
            case 'observation-sites':
                ObservationPage.renderSites(content);
                break;
            case 'observation-manage':
                ObservationPage.renderManage(content);
                break;
            case 'species-directory':
                SpeciesPage.renderDirectory(content);
                break;
            case 'species-records':
                SpeciesPage.renderRecords(content);
                break;
            case 'species-ringing':
                SpeciesPage.renderRinging(content);
                break;
            case 'migration-rhythm':
                MigrationPage.renderRhythm(content);
                break;
            case 'migration-routes':
                MigrationPage.renderRoutes(content);
                break;
            case 'patrol-tracks':
                PatrolPage.renderTracks(content);
                break;
            case 'patrol-tasks':
                PatrolPage.renderTasks(content);
                break;
            case 'patrol-prevention':
                PatrolPage.renderPrevention(content);
                break;
            case 'habitat-water':
                HabitatPage.renderWater(content);
                break;
            case 'habitat-restoration':
                HabitatPage.renderRestoration(content);
                break;
            case 'rescue-records':
                RescuePage.renderRecords(content);
                break;
            case 'rescue-treatment':
                RescuePage.renderTreatment(content);
                break;
            case 'rescue-release':
                RescuePage.renderRelease(content);
                break;
            case 'education-birdwatching':
                EducationPage.renderBirdwatching(content);
                break;
            case 'education-reporting':
                EducationPage.renderReporting(content);
                break;
            default:
                DashboardPage.render(content);
        }
    },

    clearCharts() {
        Object.keys(this.charts).forEach(key => {
            if (this.charts[key]) {
                this.charts[key].destroy();
            }
            delete this.charts[key];
        });
    },

    clearMaps() {
        Object.keys(this.maps).forEach(key => {
            if (this.maps[key]) {
                this.maps[key].remove();
            }
            delete this.maps[key];
        });
    },

    // 工具方法：数字动画
    animateNumber(element, target, duration = 1000) {
        const start = 0;
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * easeProgress);
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    },

    // 工具方法：格式化数字
    formatNumber(num) {
        return num.toLocaleString();
    }
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
