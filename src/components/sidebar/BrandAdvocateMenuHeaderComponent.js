import React from 'react';
import { Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
// import Logo from '../../assets/icon-logo';

const styles = StyleSheet.create({
    container: {
        marginRight: 32,
        marginTop: 32
    },
    title: {
        fontFamily: 'Muli',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 19,
        lineHeight: '24px',
        letterSpacing: '0.4px',
        color: 'White',
        marginLeft: 12
    }
});

function BrandAdvocateMenuHeaderComponent(props) {
    const { title} = props;
    return (
        <Row className={css(styles.container)} horizontal="center" vertical="center">
            {/* <Logo /> */}
            <span className={css(styles.title)}>{title}</span>
        </Row>
    );
}

export default BrandAdvocateMenuHeaderComponent;
