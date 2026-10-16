import { useInView } from '../../hooks/useUtils';
import './SectionHeader.css';

export default function SectionHeader({
  overline,
  title,
  description,
  align = 'center',
  dark = false,
  as: HeadingTag = 'h2',
}) {
  const [ref, isVisible] = useInView();

  return (
    <div
      ref={ref}
      className={`hk-sh ${align === 'left' ? 'hk-sh--left' : ''} ${dark ? 'hk-sh--dark' : ''} ${isVisible ? 'hk-sh--visible' : ''}`}
    >
      {overline && (
        <span className="hk-overline hk-sh__overline">{overline}</span>
      )}
      <HeadingTag className="hk-sh__title">{title}</HeadingTag>
      {description && (
        <p className="hk-sh__desc">{description}</p>
      )}
      <div className="hk-divider--bronze hk-sh__rule" />
    </div>
  );
}
