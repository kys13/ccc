document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = loginForm.querySelector('[name="email"]').value;
        const password = loginForm.querySelector('[name="password"]').value;
        
        const result = await window.auth.login(email, password);
        
        if (result.success) {
            // 리다이렉트 URL이 있으면 해당 페이지로, 없으면 메인으로
            const redirectUrl = new URLSearchParams(window.location.search).get('redirect') || '/';
            window.location.href = redirectUrl;
        } else {
            alert(result.message || '로그인에 실패했습니다.');
        }
    });
}); 