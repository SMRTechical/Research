import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import {StaggeredMotion, spring} from 'react-motion';

const colors = [
    '#3F51B5',
  '#2196F3',
    '#03A9F4',
    '#00BCD4',
'#5883ae;'
];

const Wrapper = styled.div`
display:flex;
width:100vw;
min-height:100vh;
background:#5883ae;
margin:0;
padding:0;
`;

const Box = styled.div`
flex-basis:${(props) => props.width}%;
background:${(props) => props.bgColor};
`;

const ContentWrapper = styled.div`
flex-basis:100%;
background:${(props) => props.bgColor};
margin:0;
padding:0;
`;

class EntranceAnimation extends Component {
  constructor(props, context) {
  super(props, context);


 
}


render() {
    const {
        children,
    } = this.props;
  return(
        <StaggeredMotion
      defaultStyles={[
          {width:100},
          {width:100},
          {width:100},
          {width:100},
      ]}
      styles={(prevStyles)=>[
          {width:spring(0)},
          {width:spring(prevStyles[0].width)},
          {width:spring(prevStyles[1].width)},
          {width:spring(prevStyles[2].width)},
          ]}>
{(styles)=>(
 <Wrapper>
<Box bgColor={colors[0]} width={styles[0].width}/>
<Box bgColor={colors[1]} width={styles[1].width}/>
<Box bgColor={colors[2]} width={styles[2].width}/>
<Box bgColor={colors[3]} width={styles[3].width}/>
<ContentWrapper bgColor={colors[4]}>
    {children}
</ContentWrapper>
  </Wrapper>
)}

 
</StaggeredMotion>
       
   
  );
 }
}

export default EntranceAnimation;