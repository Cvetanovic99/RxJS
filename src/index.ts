import {drawPage} from "./drawingFunctions";
import { from, fromEvent, of, Observable } from "rxjs";
import {takeUntil,take, debounceTime,delay, filter} from "rxjs/operators";

drawPage(document.body);
