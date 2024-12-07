const Tooltip = (props) => {
  const {
    touched,
    validError,
    authError,
    last,
  } = props;

  if (touched && validError) {
    return (
      <div className="invalid-tooltip">{validError}</div>
    );
  } else if (authError && last) {
    return (
      <div className="invalid-tooltip">{authError}</div>
    );
  } else if (authError && !last) {
    return (
      <div className="invalid-tooltip" />
    );
  } else {
    return (null);
  }
};

export default Tooltip;