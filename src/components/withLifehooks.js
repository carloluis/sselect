import React, { Component } from 'react';

const checkFunction = func => typeof func === 'function';

const componentName = (RComponent) => RComponent.displayName || RComponent.name || 'Component';

const withLifehooks = ({ componentWillMount, componentDidMount, componentWillReceiveProps, shouldComponentUpdate, componentWillUpdate, componentDidUpdate, componentWillUnmount }) => (WrappedComponent) => {
	return class extends WrappedComponent {
		static displayName = 'Lifehooks(${componentName(WrappedComponent))'
		componentWillMount() {
			if (checkFunction(componentWillMount)) {
				componentWillMount();
			}
			super.componentWillMount && super.componentDidMount();
		}
		componentDidMount() {
			if (checkFunction(componentDidMount)) {
				componentDidMount();
			}
			super.componentDidMount();
		}
		/*componentWillReceiveProps(nextProps) {
			if (checkFunction(componentWillReceiveProps)) {
				componentWillReceiveProps(nextProps);
			}
			super.componentWillReceiveProps(nextProps);
		}
		shouldComponentUpdate(nextProps, nextState) {
			if (checkFunction(shouldComponentUpdate)) {
				shouldComponentUpdate(nextProps, nextState);
			}
			return super.shouldComponentUpdate(nextProps, nextState);
		}
		componentWillUpdate(nextProps, nextState) {
			if (checkFunction(componentWillUpdate)){
				componentWillUpdate(nextState, nextProps);
			}
			super.componentWillUpdate(nextProps, nextState);
		}
		componentDidUpdate(prevProps, prevState) {
			if (checkFunction(componentDidUpdate)) {
				componentDidUpdate(prevProps, prevState);
			}
			super.componentDidUpdate(prevProps, prevState);
		}
		componentWillUnmount() {
			if (checkFunction(componentWillUnmount)) {
				componentWillUnmount();
			}
			super.componentWillUnmount();
		}*/
		render (){
			return super.render();
		}
	};
}

export default withLifehooks;