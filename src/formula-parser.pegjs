Formula
  = _ op: Op? _ head: Addend _ tail: AddendAndOpt*
    {
      return [
        {
          op: op || "+",
          ...head
        }
      ].concat(tail);
    }

AddendAndOpt
  = op: Op _ value: Addend _
    {
      return {
        op,
        ...value
      };
    }

Op = "+" / "-"

Addend
  = number: Integer _ D _ sides: Integer
    { return { type: "roll", number, sides }; }
  / value: Integer
    { return { type: "number", value }; }

Integer "integer"
  = [0-9]+
    { return parseInt(text(), 10); }

D = "d" / "D"

_ "whitespace" = [ \t\n\r]*
