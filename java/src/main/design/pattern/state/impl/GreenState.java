package main.design.pattern.state.impl;

import main.design.pattern.state.logic.Context;
import main.design.pattern.state.intf.IState;

/**
 * Title : main.design.pattern.state
 * Description :
 *  - blue -> red -> green
 *
 * @author main.chile
 * @version 1.0
 * @date 2017/3/30 13:45
 */

public class GreenState implements IState {

    @Override public void lastState(Context c) {
        c.setState(new RedState());
    }

    @Override public void nextState(Context c) {
        c.setState(new BlueState());
    }

    @Override public String getCurrentState() {
        return "green";
    }
}
