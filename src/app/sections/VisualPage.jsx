
export default function VisualPage({selectedTask}) {
    return (
      <div>
      {selectedTask === 'SoulWall' ? (
        <p>This is the VisualPage for the <strong>SoulWall</strong> task.</p>
      ) : (
        <p>This is the VisualPage for the <strong>Map</strong> task.</p>
      )}
    </div>
    );
  }
  