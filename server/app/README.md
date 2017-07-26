##### Dummy data prefill:

The following number of collections are inserted in the db:
- subjects, researchers: 1000;
- devices, software: 50;
- activities: 10000;
- forms: 1 form per new entity type to insert;
- subms: 0;

These amounts to replicate a production situation, and to test performance of memory-demanding opertations such as ``$graphLookup`` stages for activities linkings.

##### Details on dummy activities generation and linking:

Activities hare assigned a probability of 50% to use a subject or not. I am thus supposing that half of the activities are associated to measurements involving a subject, whereas the other half is data processing following measurements, and thus not involving subjects directly. When a new dummy activity is generated, it is checked if it uses a subject or not. If not (e.g. data processing), an attempt to backward-search an activity that uses a subject (e.g. data collection) is performed. If successful, one random output ``cuid`` of the previous activity is used (linked) in the ``other_resources`` array field of the current activity. After 5 unsucessful attempts, the current activity is descarded, and a new one is created and the loops restarts. This way, every kind of activity is directly or indirectly (backward search) linkeable to a subject, for important queries such as "give me all the result for subject X".
