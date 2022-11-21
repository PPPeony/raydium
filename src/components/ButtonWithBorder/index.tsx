import './index.less';

export default function ButtonWithBorder(props: { children: string }) {
  return (
    <button type="button" className="button-with-border">
      {props.children}
    </button>
  );
}
