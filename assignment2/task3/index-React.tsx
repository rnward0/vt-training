import { isAuthenticated } from "@vividtheory/ha-common";
import { DealershipSalesUpdate } from "@vividtheory/yd-backend";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAuthenticatedUser } from "../../user/redux/hooks";
import {
  useDealershipContactInQuestion,
  useDealershipInQuestion,
} from "../redux/hooks";
import { actions as dealershipActions } from "../redux/model";
import DealershipSalesUpdates from "../views/DealershipSalesUpdates";

//replace multiple dealership and isAuthenticated checks with one check
//extracted logic for dispatching actions to seperate function

const dispatchActions = (action: any, options: Object) => {
  const dispatch = useDispatch();
  return dispatch(
    action.request({
      ...options,
    })
  );
};

const DealershipSalesUpdatesContainer = () => {
  const user = useAuthenticatedUser();
  const dealership = useDealershipInQuestion();
  const contact = useDealershipContactInQuestion();

  const [newMessage, setNewMessage] = useState("");

  if (isAuthenticated(user) && dealership) {
    const handleEditing = (
      update: DealershipSalesUpdate,
      newMessage: string
    ) => {
      dispatchActions(dealershipActions.editDealershipUpdate, {
        authenticatedUser: user,
        dealershipId: dealership.id,
        updateId: update.id,
        newMessage: newMessage,
      });
    };

    const handleDelete = (update: DealershipSalesUpdate) => {
      dispatchActions(dealershipActions.deleteDealershipUpdate, {
        authenticatedUser: user,
        dealershipId: dealership.id,
        updateId: update.id,
      });
    };

    const addMessage = () => {
      dispatchActions(dealershipActions.addDealershipUpdate, {
        authenticatedUser: user,
        fields: {
          fkDealershipId: dealership.id,
          message: newMessage,
          fkUserId: user.user.id,
        },
      });
    };

    const editAddMessage = (message: string) => {
      setNewMessage(message);
    };

    if (dealership) {
      const salesUpdates = contact
        ? dealership.salesUpdates.filter(
            (update: { contact: { id: any } }) =>
              update.contact?.id === contact.id
          )
        : dealership.salesUpdates;
      return (
        <DealershipSalesUpdates
          dealership={dealership}
          salesUpdates={salesUpdates}
          user={user}
          handleEditing={handleEditing}
          handleDelete={handleDelete}
          addMessage={addMessage}
          canAddMessage={newMessage.length > 2}
          editAddMessage={editAddMessage}
        />
      );
    }
  }

  return null;
};

export default DealershipSalesUpdatesContainer;
