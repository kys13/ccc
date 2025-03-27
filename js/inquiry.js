document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.inquiry-form');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // 폼 데이터 수집
        const formData = new FormData(form);
        
        try {
            // 여기에 실제 API 호출 로직 추가
            console.log('문의 내용:', Object.fromEntries(formData));
            
            // 성공 메시지
            alert('문의가 성공적으로 접수되었습니다.');
            form.reset();
            
        } catch (error) {
            console.error('문의 접수 실패:', error);
            alert('문의 접수 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    });
}); 