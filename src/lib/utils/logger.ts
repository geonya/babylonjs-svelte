class ConsoleProxy {
	console: Console;
	consoleIsPresent: boolean;
	messageBuffer: string[];
	constructor(console: Console) {
		this.console = console;
		this.consoleIsPresent = Boolean(this.console);
		this.messageBuffer = [];
	}

	logInfo<T>(message: string, obj?: T) {
		const logObj = { type: 'INFO', message };
		if (this.consoleIsPresent) {
			this.console.log(logObj.message, obj);
			return;
		}
		this.messageBuffer.push(message);
	}

	logWarning(message: string) {
		const logObj = { type: 'WARN', message: message };
		if (this.consoleIsPresent) {
			this.console.log(logObj);
			return;
		}
		this.messageBuffer.push(message);
	}

	logError(message: string) {
		const logObj = { type: 'ERROR', message: message };
		if (this.consoleIsPresent) {
			this.console.log(logObj);
			return;
		}
		this.messageBuffer.push(message);
	}

	logFatal(message: string) {
		const logObj = { type: 'FATAL', message: message };
		if (this.consoleIsPresent) {
			this.console.log(logObj);
			return;
		}
		this.messageBuffer.push(message);
	}

	flushBuffer() {
		this.messageBuffer.splice(0, this.messageBuffer.length);
	}
}
const logger = new ConsoleProxy(console);
export default logger;
