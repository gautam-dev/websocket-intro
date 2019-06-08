package com.example.demo;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

/**
 * Author Gautam
 * The Class GreetingController.
 */
@Controller
public class GreetingController {
	
	/**
	 * Greeting.
	 *
	 * @param message the message
	 * @return the string
	 * @throws Exception the exception
	 */
	@MessageMapping("/message")
	@SendTo("/topic/messages")
	public String greeting(String message) throws Exception {
		return message;
	}
	
	/**
	 * Conversation.
	 *
	 * @param message the message
	 * @return the string
	 * @throws Exception the exception
	 */
	@MessageMapping("/conversation")
	@SendTo("/topic/conversation")
	public String conversation(String message) throws Exception {
		return HtmlUtils.htmlEscape(message);
	}
}
