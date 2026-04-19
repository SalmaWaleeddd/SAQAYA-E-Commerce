import { shallowMount } from '@vue/test-utils';
import BaseButton from '@/components/ui/BaseButton.vue';

describe('BaseButton.vue', () => {
  let wrapper: any;

  afterEach(() => {
    if (wrapper) wrapper.destroy();
  });

  describe('Rendering', () => {
    it('renders button with default variant', () => {
      wrapper = shallowMount(BaseButton);
      expect(wrapper.classes()).toContain('base-btn--primary');
    });

    it('renders button with secondary variant', () => {
      wrapper = shallowMount(BaseButton, {
        propsData: { variant: 'secondary' }
      });
      expect(wrapper.classes()).toContain('base-btn--secondary');
    });

    it('renders button with outline variant', () => {
      wrapper = shallowMount(BaseButton, {
        propsData: { variant: 'outline' }
      });
      expect(wrapper.classes()).toContain('base-btn--outline');
    });

    it('renders button with fullWidth class when fullWidth is true', () => {
      wrapper = shallowMount(BaseButton, {
        propsData: { fullWidth: true }
      });
      expect(wrapper.classes()).toContain('base-btn--full-width');
    });

    it('does not render fullWidth class when fullWidth is false', () => {
      wrapper = shallowMount(BaseButton, {
        propsData: { fullWidth: false }
      });
      expect(wrapper.classes()).not.toContain('base-btn--full-width');
    });

    it('displays text from text prop', () => {
      const buttonText = 'Click Me';
      wrapper = shallowMount(BaseButton, {
        propsData: { text: buttonText }
      });
      expect(wrapper.text()).toBe(buttonText);
    });

    it('displays slot content instead of text prop', () => {
      wrapper = shallowMount(BaseButton, {
        propsData: { text: 'Prop Text' },
        slots: { default: 'Slot Content' }
      });
      expect(wrapper.text()).toBe('Slot Content');
    });
  });

  describe('Events', () => {
    it('emits click event when button is clicked', async () => {
      wrapper = shallowMount(BaseButton);
      await wrapper.trigger('click');
      expect(wrapper.emitted('click')).toBeTruthy();
      expect(wrapper.emitted('click').length).toBe(1);
    });

    it('emits click event with $event payload', async () => {
      wrapper = shallowMount(BaseButton);
      await wrapper.trigger('click');
      expect(wrapper.emitted('click')[0]).toBeDefined();
    });
  });

  describe('Styling', () => {
    it('applies correct base classes', () => {
      wrapper = shallowMount(BaseButton);
      expect(wrapper.classes()).toContain('base-btn');
    });

    it('applies multiple classes correctly', () => {
      wrapper = shallowMount(BaseButton, {
        propsData: { variant: 'outline', fullWidth: true }
      });
      expect(wrapper.classes()).toContain('base-btn');
      expect(wrapper.classes()).toContain('base-btn--outline');
      expect(wrapper.classes()).toContain('base-btn--full-width');
    });
  });
});