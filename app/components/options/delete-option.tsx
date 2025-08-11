import { Option } from './option';
import { TrashIcon } from '@heroicons/react/24/outline';
import { create } from 'stylex';
import { colors } from '@/app/styles/vars.stylex';

export function DeleteOption({ onSelect }: { onSelect: () => void }) {
  return (
    <Option
      IconComponent={TrashIcon}
      label="Delete"
      onSelect={onSelect}
      styleProps={styles.base}
    />
  );
}

const styles = create({
  base: {
    color: colors.alert,
  },
});
