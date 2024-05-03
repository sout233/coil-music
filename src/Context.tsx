// Context.tsx
import React from 'react';

type ContextType = {
    callBMethod: () => void;
};

const MyContext = React.createContext < ContextType > ({
    callBMethod: () => { }
});

export default MyContext;
