// JWT Debug Script
// Bu script'i browser console'da çalıştırarak cookie'leri kontrol edebilirsiniz

console.log('=== LOGIN DEBUG INFORMATION ===');

// 1. Cookie'leri kontrol et
console.log('1. Cookies:');
console.log('All cookies:', document.cookie);

// Auth token'ı çıkar
const authToken = document.cookie
  .split('; ')
  .find(row => row.startsWith('auth-token='))
  ?.split('=')[1];

console.log('Auth token exists:', !!authToken);
if (authToken) {
  console.log('Auth token (first 20 chars):', authToken.substring(0, 20) + '...');
}

// 2. Environment check
console.log('\n2. Environment:');
console.log('Current URL:', window.location.href);
console.log('Protocol:', window.location.protocol);
console.log('Host:', window.location.host);

// 3. Test API endpoints
console.log('\n3. Testing API endpoints...');

// Health check
fetch('/api/health')
  .then(response => response.json())
  .then(data => {
    console.log('Health check result:', data);
  })
  .catch(error => {
    console.error('Health check error:', error);
  });

// Auth me endpoint
fetch('/api/auth/me', {
  credentials: 'include'
})
  .then(response => {
    console.log('Auth me status:', response.status);
    return response.json();
  })
  .then(data => {
    console.log('Auth me result:', data);
  })
  .catch(error => {
    console.error('Auth me error:', error);
  });

// 4. Manual login test function
window.testLogin = async function(email = 'admin@test.com', password = '123456') {
  console.log('\n4. Testing manual login...');
  
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    });
    
    console.log('Login response status:', response.status);
    const result = await response.json();
    console.log('Login response data:', result);
    
    // Check cookies after login
    setTimeout(() => {
      console.log('Cookies after login:', document.cookie);
      // Try to navigate
      if (response.ok) {
        console.log('Attempting navigation to dashboard...');
        window.location.href = '/dashboard';
      }
    }, 1000);
    
  } catch (error) {
    console.error('Manual login error:', error);
  }
};

console.log('\n=== DEBUG COMMANDS ===');
console.log('Run testLogin() to test manual login');
console.log('Run testLogin("youremail@test.com", "demo123") for custom credentials');

export {};