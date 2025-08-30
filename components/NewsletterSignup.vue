<template>
  <div class="newsletter-signup">
    <div class="newsletter-content">
      <h3 class="newsletter-title">
        <font-awesome-icon :icon="['fas', 'envelope']" class="newsletter-icon" />
        Stay Connected
      </h3>
      <p class="newsletter-description">
        Get insights on AI, developer advocacy, and open source delivered to your inbox. 
        Plus exclusive content and early access to new projects.
      </p>
      <div class="newsletter-form">
        <a 
          href="https://acekyd.substack.com" 
          target="_blank" 
          rel="noopener" 
          class="newsletter-button"
          aria-label="Subscribe to Ace's newsletter on Substack"
        >
          Subscribe on Substack
          <font-awesome-icon :icon="['fas', 'external-link-alt']" class="external-icon" />
        </a>
      </div>
      <p class="newsletter-note">
        Free weekly insights • No spam • Unsubscribe anytime
      </p>
    </div>
  </div>
</template>

<script setup>
// No reactive data needed for this simple component
</script>

<style lang="scss" scoped>
.newsletter-signup {
  background: linear-gradient(135deg, #12b488 0%, #0ea478 100%);
  border-radius: 16px;
  padding: 2rem;
  margin: 2rem 0;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.newsletter-signup::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  animation: pulse 4s ease-in-out infinite;
  pointer-events: none;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.05);
  }
}

.newsletter-content {
  position: relative;
  z-index: 1;
}

.newsletter-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.newsletter-icon {
  font-size: 1.2rem;
}

.newsletter-description {
  font-size: 1rem;
  margin-bottom: 1.5rem;
  opacity: 0.95;
  line-height: 1.6;
}

.newsletter-form {
  margin-bottom: 1rem;
}

.newsletter-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  color: #12b488;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.newsletter-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  background: #f8f9fa;
  text-decoration: none;
}

.external-icon {
  font-size: 0.8rem;
}

.newsletter-note {
  font-size: 0.85rem;
  opacity: 0.8;
  margin: 0;
}

@media (max-width: 768px) {
  .newsletter-signup {
    padding: 1.5rem;
    margin: 1.5rem 0;
  }
  
  .newsletter-title {
    font-size: 1.3rem;
  }
  
  .newsletter-description {
    font-size: 0.9rem;
  }
}
</style>
