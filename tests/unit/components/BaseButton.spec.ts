import { mount } from '@vue/test-utils';
import BaseButton from '@/components/ui/BaseButton.vue';

describe('BaseButton.vue', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(BaseButton);
  });

  afterEach(() => {
    if (wrapper) wrapper.unmount();
  });

  describe('Rendering', () => {
    it('renders button with default variant', () => {
      expect(wrapper.classes()).toContain('base-btn--primary');
    });

    it('renders button with secondary variant', async () => {
      await wrapper.setProps({ variant: 'secondary' });
      expect(wrapper.classes()).toContain('base-btn--secondary');
    });

    it('renders button with outline variant', async () => {
      await wrapper.setProps({ variant: 'outline' });
      expect(wrapper.classes()).toContain('base-btn--outline');
    });

    it('renders button with fullWidth class when fullWidth is true', async () => {
      await wrapper.setProps({ fullWidth: true });
      expect(wrapper.classes()).toContain('base-btn--full-width');
    });

    it('displays text from text prop', async () => {
      const buttonText = 'Click Me';
      await wrapper.setProps({ text: buttonText });
      expect(wrapper.text()).toBe(buttonText);
    });
  });

  describe('Events', () => {
    it('emits click event when button is clicked', async () => {
      await wrapper.trigger('click');
      expect(wrapper.emitted('click')).toBeTruthy();
    });
  });
});