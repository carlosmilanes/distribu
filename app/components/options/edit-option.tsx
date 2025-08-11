import { Option } from './option';
import { EditIcon } from '@/app/components/icons';
import { create } from 'stylex';
import { colors } from '@/app/styles/vars.stylex';

export function EditOption({ onSelect }: { onSelect: () => void }) {
  return (
    <Option
      IconComponent={EditIcon}
      label="Edit"
      onSelect={onSelect}
      styleProps={styles.base}
    />
  );
}

const styles = create({
  base: {},
});
