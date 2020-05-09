
import EnhancedInput from './enhanced-input';
import PhoneInput from './phone-input';

export default function getEnhancedInput(options, type) {
    switch (type) {
        case 'phone':
            return new PhoneInput(options);
        default:
            return new EnhancedInput(options);
    }
}
