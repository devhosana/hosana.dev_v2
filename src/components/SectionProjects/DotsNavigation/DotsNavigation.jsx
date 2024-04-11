import "./DotsNavigation.css";

const DotsNavigation = function({ index, cardProjectOrder, handleProjectsMovement }) {
  return (
    <div
      className={`dot ${cardProjectOrder === index ? ' active-dot' : ''}`}
      onClick={() => handleProjectsMovement(index)}
    />
  );
};

export default DotsNavigation;
