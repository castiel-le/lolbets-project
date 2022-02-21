import { useParams } from "react-router-dom";

/**
 * Used to allow access withRouter functionality in class components to
 * get the params.
 * @param {*} Child 
 * @returns 
 */
export default function withRouter( Child ) {
  // eslint-disable-next-line react/display-name
  return ( props ) => {
    const params = useParams();
    return <Child { ...props } params ={ params } />;
  }
}