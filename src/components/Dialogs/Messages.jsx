import React from 'react';
import s from './Messages.module.css';
import DialogsItem from './DialogsItem/DialogsItem.tsx';
import Message from './Message/Message';
import MessageForm from './Message/MessageForm';

export default function Messages(props) {
	const onAddMessage = (message) => {
		props.addMessage(message);
	};

	const dialogMessages = props.messageData.map((item, index) => {
		return <Message message={item.message} key={index} addMessage={item.addMessage} />;
	});
	const dialogItems = props.usersData.map((item) => {
		return (
			<DialogsItem
				name={item.name}
				id={item.id}
				key={item.id}
				img={item.img}
				message={item.message}
			/>
		);
	});

	return (
		<div className={s.dialogs}>
			<div className={s.users}>{dialogItems}</div>
			<div className={s.messages}>{dialogMessages}</div>

			<div className={s.form}>
				<MessageForm addMessage={onAddMessage} />
			</div>
		</div>
	);
}
