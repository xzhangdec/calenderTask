# calenderTask
This is a task required by sphere

Test cases passed:
1. Normal functionality including tap, touch, drag, scroll. Expected behavior: only tap will trigger event. All others should remain the same.
2. Tap on the slot of the canlender should trigger a menu which indicate start time, stop time, and cancel.
3. When user keep tap and cancel, the touched slot should clean up properly.
4. When user click start, the touched slot should be selected.
5. When user has wrong input, all the leftover middle stages should be cleaned up.
6. When user has wrong input, proper alert should be raised.
7. Start time and stop time in same slot should select that slot.
8. Basic non cross functionality.
9. Cross noon functionality.
10. Cross multi days functionality.
11. Overlap cases. 

Test device Iphone 7 plus.
