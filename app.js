// ============================================================
// NAV SCROLL EFFECT
// ============================================================
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// ============================================================
// CONTACT FORM
// ============================================================
async function submitContactForm() {
  const name    = document.getElementById('cf-name').value.trim();
  const email   = document.getElementById('cf-email').value.trim();
  const message = document.getElementById('cf-message').value.trim();

  if (!name || !email || !message) {
    alert('Пожалуйста, заполните все поля.');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Введите корректный email.');
    return;
  }

  const btn = document.querySelector('.contact-submit');
  btn.disabled = true;
  btn.textContent = 'Отправляем...';

  try {
    const res = await fetch('https://iziserb-webhook.vercel.app/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, subject: 'Сайт iziserb.com', message })
    });
    if (!res.ok) throw new Error('Server error');
    document.getElementById('contact-form-block').style.display = 'none';
    document.getElementById('contact-success').style.display = 'flex';
  } catch (e) {
    alert('Не удалось отправить. Напишите напрямую: support@iziserb.com');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Отправить';
  }
}

// ============================================================
// FAQ ACCORDION
// ============================================================
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const arrow = btn.querySelector('.faq-arrow');
  const isOpen = answer.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-a').forEach(a => a.classList.remove('open'));
  document.querySelectorAll('.faq-arrow').forEach(a => a.classList.remove('rotated'));

  // Open clicked if it was closed
  if (!isOpen) {
    answer.classList.add('open');
    arrow.classList.add('rotated');
  }
}
