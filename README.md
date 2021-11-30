# Container
a container, is a building block, with slice of its own
containers should be generated with `yarn generate container` command
each page of application should have a separate container
each independent part of application that has it's own state and updates it's own state, specially if it's used in several places, should be in a separate container

containers can see each others state, and update them, but first we should make sure that "Saga" and "Reducer" of the target container is injected, this will be done by using use"Container"Slice() hook somewhere in the app

### saga
saga of a container has access to every `injected` reducer, and every slice of application state
saga should not know that it's being used in a react application (other than throwing a toast with toastify package)

### state
there should be no local state used in the application without discussing about it with one of the Platform development team members, every state in the application will be stored on redux, and every change of state should be done in redux ecosystem. if we want to have a computed state, we will avoid using useEffect and use useSelector with proper state domains combination in the selector

### types
all the types related to container state, should be defined in types.ts file in the container

# coding style

### size
no file containing jsx elements should be more than 150 lines, if it is, it should be broken down and refactored to multiple components

