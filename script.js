// 钱包连接状态
let walletConnected = false;
let userAddress = '';

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    updateStats();
    setupEventListeners();
});

// 设置事件监听器
function setupEventListeners() {
    // 连接钱包按钮
    document.getElementById('connectWallet').addEventListener('click', connectWallet);
    
    // MINT 按钮
    document.getElementById('mintButton').addEventListener('click', handleMint);
}

// 连接钱包
async function connectWallet() {
    showNotification('功能开发中，敬请期待！', 'info');
    
    // 实际项目中的钱包连接代码：
    /*
    if (typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await window.ethereum.request({ 
                method: 'eth_requestAccounts' 
            });
            userAddress = accounts[0];
            walletConnected = true;
            
            document.getElementById('connectWallet').textContent = 
                userAddress.slice(0, 6) + '...' + userAddress.slice(-4);
            
            showNotification('钱包连接成功！', 'success');
        } catch (error) {
            showNotification('钱包连接失败：' + error.message, 'error');
        }
    } else {
        showNotification('请安装 MetaMask 钱包！', 'error');
    }
    */
}

// 处理 MINT
function handleMint() {
    if (!walletConnected) {
        showNotification('请先连接钱包！', 'warning');
        return;
    }
    
    showNotification('MINT 功能即将开放，敬请期待！', 'info');
    
    // 实际项目中的 MINT 代码：
    /*
    try {
        // 调用智能合约的 mint 函数
        const tx = await contract.mint({
            value: ethers.utils.parseEther('0.02')
        });
        
        showNotification('交易已提交，等待确认...', 'info');
        
        await tx.wait();
        
        showNotification('MINT 成功！', 'success');
        updateStats();
    } catch (error) {
        showNotification('MINT 失败：' + error.message, 'error');
    }
    */
}

// 复制合约地址
function copyContract() {
    const contractAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb8';
    
    // 创建临时文本框
    const tempInput = document.createElement('input');
    tempInput.value = contractAddress;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    
    showNotification('合约地址已复制！', 'success');
}

// 滚动到 MINT 区域
function scrollToMint() {
    document.getElementById('mint').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// 显示白皮书
function showWhitepaper() {
    showNotification('白皮书即将发布，敬请期待！', 'info');
}

// 显示即将推出提示
function showComingSoon() {
    showNotification('功能即将推出，敬请期待！', 'info');
}

// 更新统计数据
function updateStats() {
    // 模拟实时数据更新
    const participants = Math.floor(Math.random() * 50) + 100;
    const raised = (participants * 0.02).toFixed(2);
    const progress = (raised / 4 * 100).toFixed(1);
    
    document.getElementById('participants').textContent = `${participants} / 200`;
    document.getElementById('raised').textContent = `${raised} BNB / 4 BNB`;
    document.getElementById('progress').style.width = `${progress}%`;
}

// 显示通知
function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    
    // 设置样式
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    
    notification.style.borderLeft = `4px solid ${colors[type]}`;
    notification.textContent = message;
    notification.classList.add('show');
    
    // 3秒后自动隐藏
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// 初始化动画
function initializeAnimations() {
    // 添加滚动动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 观察所有卡片元素
    document.querySelectorAll('.mechanism-card, .feature-card, .roadmap-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s, transform 0.6s';
        observer.observe(card);
    });
}

// 每10秒更新一次统计数据
setInterval(updateStats, 10000);
