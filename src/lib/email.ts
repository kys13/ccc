import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function sendVerificationEmail(email: string, token: string) {
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;

    await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: email,
        subject: '이메일 인증을 완료해주세요',
        html: `
            <h1>이메일 인증</h1>
            <p>아래 링크를 클릭하여 이메일 인증을 완료해주세요:</p>
            <a href="${verificationUrl}">${verificationUrl}</a>
            <p>이 링크는 24시간 동안 유효합니다.</p>
        `,
    });
}

export async function sendPasswordResetEmail(email: string, token: string) {
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

    await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: email,
        subject: '비밀번호 재설정',
        html: `
            <h1>비밀번호 재설정</h1>
            <p>아래 링크를 클릭하여 비밀번호를 재설정하세요:</p>
            <a href="${resetUrl}">${resetUrl}</a>
            <p>이 링크는 1시간 동안 유효합니다.</p>
        `,
    });
} 