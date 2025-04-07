import { create, props as props } from 'stylex';

export function Picture() {
  return (
    <img
      {...props(styles.image)}
      src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e'
      alt='Beautiful landscape'
    />
  );
}

const styles = create({
  image: {
    margin: 'auto',
    marginTop: '270px',
    width: '60%',
    height: 'auto',
    maxHeight: '80vh',
    objectFit: 'cover',
    borderRadius: '8px',
  },
});
