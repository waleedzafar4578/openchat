import logging
from colorama import Fore, Style, init

init(autoreset=True)


class ColorLogs:
    def __init__(self, name="uvicorn"):
        self.logger = logging.getLogger(name)
        self.logger.setLevel(logging.DEBUG)

        handler = logging.StreamHandler()
        formatter = logging.Formatter(
            '%(asctime)s | %(levelname)s | %(message)s')

        handler.setFormatter(formatter)
        self.logger.addHandler(handler)

    def info(self, msg):
        self.logger.info(Fore.YELLOW + msg)

    def warning(self, msg):
        self.logger.warning(Fore.YELLOW + msg)

    def error(self, msg):
        self.logger.error(Fore.RED + Style.BRIGHT + msg)

    def debug(self, msg):
        self.logger.debug(Fore.CYAN + msg)




def getLogger():
    return logging.getLogger("uvicorn")

