describe("Journal Functions Tests", () => {
  const journalOne = [
    {
      date: "2020-01-01",
      events: ["lunch", "work", "tv"],
      calledMom: false,
    },
    {
      date: "2020-01-02",
      events: ["lunch", "work", "tv"],
      calledMom: false,
    },
    {
      date: "2020-01-03",
      events: ["lunch", "work", "tv"],
      calledMom: false,
    },
  ];

  const journalTwo = [
    {
      date: "2020-01-01",
      events: ["lunch", "work", "tv"],
      calledMom: false,
    },
    {
      date: "2020-01-02",
      events: ["lunch", "work", "tv"],
      calledMom: true,
    },
    {
      date: "2020-01-03",
      events: ["lunch", "work", "tv"],
    },
  ];

  it("checkIfCalledMomIsInJournal returns true if all entries have calledMom", () => {
    expect(checkIfCalledMomIsInJournal(journalOne)).toBe(true);
  });
  it("checkIfCalledMomIsInJournal returns false if one entry does not have calledMom", () => {
    expect(checkIfCalledMomIsInJournal(journalTwo)).toBe(false);
  });

  it("checkIfCalledMomIsInAnyJournal returns true if any entry has calledMom", () => {
    expect(checkIfCalledMomIsInAnyJournal(journalTwo)).toBe(true);
  });

  it("returnAllKeysFromFirstEntry returns all keys from the first journal entry", () => {
    expect(returnAllKeysFromFirstEntry(journalOne)).toEqual([
      "date",
      "events",
      "calledMom",
    ]);
  });

  it("returnAllValuesFromSpecificEntry returns all values from a specified entry", () => {
    expect(returnAllValuesFromSpecificEntry(journalOne, 0)).toEqual([
      "2020-01-01",
      ["lunch", "work", "tv"],
      false,
    ]);
  });

  it("updateSecondEntry adds dinner to the second entry events", () => {
    const updatedJournal = updateSecondEntry([...journalTwo]);
    expect(updatedJournal[1].events).toContain("dinner");
  });

  it("addEventToEntryAtIndex adds an event to a specific entry", () => {
    const updatedJournal = addEventToEntryAtIndex([...journalOne], 0, "dinner");
    expect(updatedJournal[0].events).toContain("dinner");
  });
  it("addEventToEntryAtIndex returns the original journal if index is out of range", () => {
    const updatedJournal = addEventToEntryAtIndex(
      [...journalOne],
      99,
      "dinner"
    );
    expect(updatedJournal).toEqual(journalOne);
  });

  it("addNewEntry adds a new entry to the journal", () => {
    const newEntry = {
      date: "2020-01-06",
      events: ["lunch", "work", "tv"],
      calledMom: false,
    };
    const updatedJournal = addNewEntry([...journalOne], newEntry);
    expect(updatedJournal.length).toBe(journalOne.length + 1);
    expect(updatedJournal[updatedJournal.length - 1].date).toBe("2020-01-06");
  });

  it("deleteFirstEntry removes the first entry from the journal", () => {
    const originalLength = journalOne.length;
    const updatedJournal = deleteFirstEntry([...journalOne]);
    expect(updatedJournal.length).toBe(originalLength - 1);
    expect(updatedJournal[0].date).not.toBe("2020-01-01");
  });
});

describe("findHappiestDay", () => {
  it("should return the entry with the highest happiness score", () => {
    const journal = [
      { date: "2021-01-01", happiness: 5 },
      { date: "2021-01-02", happiness: 7 },
      { date: "2021-01-03", happiness: 9 }, // Happiest
    ];
    expect(findHappiestDay(journal)).toEqual(journal[2]);
  });

  it("should return the first entry in case of a tie", () => {
    const journal = [
      { date: "2021-01-01", happiness: 7 },
      { date: "2021-01-02", happiness: 7 }, // Tie
    ];
    expect(findHappiestDay(journal)).toEqual(journal[0]);
  });
});

describe("calculateAverageHappiness", () => {
  it("should return the average happiness score", () => {
    const journal = [{ happiness: 4 }, { happiness: 6 }, { happiness: 8 }];
    expect(calculateAverageHappiness(journal)).toBe(6);
  });
});

describe("mostFrequentActivity", () => {
  it("should return the most frequent activity", () => {
    const journal = [
      { events: ["eat", "sleep"] },
      { events: ["eat", "code"] },
      { events: ["dinner", "eat"] },
    ];
    expect(mostFrequentActivity(journal)).toBe("eat");
    const journal2 = [
      { events: ["eat", "sleep", "dinner"] },
      { events: ["eat", "code"] },
      { events: ["dinner", "eat"] },
      { events: ["dinner", "sleep"] },
    ];
    expect(mostFrequentActivity(journal2)).toBe("dinner" || "eat"); // Multiple correct answers possible
  });
});

describe("filterEntriesByActivity", () => {
  it("should return entries that include a specified activity", () => {
    const journal = [{ events: ["eat", "sleep"] }, { events: ["eat", "code"] }];
    const filtered = filterEntriesByActivity(journal, "code");
    expect(filtered.length).toBe(1);
    expect(filtered[0]).toEqual(journal[1]);
  });
});

describe("longestMomCallStreak", () => {
  it("should return the longest streak of consecutive days calling mom", () => {
    const journal = [
      { calledMom: true },
      { calledMom: true },
      { calledMom: false },
      { calledMom: true },
    ];
    expect(longestMomCallStreak(journal)).toBe(2);
  });
});

describe("addEventIfMomNotCalled", () => {
  it("should add an event to entries where mom was not called", () => {
    const journal = [
      { events: [], calledMom: false },
      { events: [], calledMom: true },
    ];
    const updatedJournal = addEventIfMomNotCalled(journal, "call mom");
    expect(updatedJournal[0].events.includes("call mom")).toBe(true);
    expect(updatedJournal[1].events.includes("call mom")).toBe(false);
  });
});

describe("generateJournalReport", () => {
  it("should generate a summary report of the journal", () => {
    const journal = [
      { happiness: 4, events: ["work"] },
      { happiness: 6, events: ["work"] },
    ];
    const report = generateJournalReport(journal);
    expect(report).toBe(
      "Total Entries: 2, Average Happiness: 5, Most Common Activity: work"
    );
  });
});
