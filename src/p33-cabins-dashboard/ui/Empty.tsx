type Props = { resourceName: string };
function Empty({ resourceName }: Props) {
  return <p>No {resourceName} could be found.</p>;
}

export default Empty;
