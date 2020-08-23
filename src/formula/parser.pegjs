Formula
  = _ head: HeadTerm tail: TailTerm*
    {
      tail.unshift(head);
      return tail;
    }

HeadTerm
  = ("+" _)? value: DiceValue
    { return value; }
  / value: NegativeValue
    { return value; }
  / ("+" _)? value: PositiveValue
    { return value; }

TailTerm
  = "+" _ value: DiceValue
    { return value; }
  / value: NegativeValue
    { return value; }
  / "+" _ value: PositiveValue
    { return value; }

PositiveValue
  = value: Integer _
    { return { type: "number", value }; }

NegativeValue
  = "-" _ value: Integer _
    { return { type: "number", value: -value }; }

DiceValue
  = count: Integer? _ D _ sides: Sides _
    { return { type: "roll", count: count === null ? 1 : count, sides }; }

Sides
  = Integer
  / PercentSign

Integer "number"
  = [0-9]+
    { return parseInt(text(), 10); }

PercentSign
  = "%" _
    { return 100; }

D "\"d\""
  = [Dd]

_ "whitespace"
  = [\t\n\r ]*
